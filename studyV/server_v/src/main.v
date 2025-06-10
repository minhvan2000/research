module main

import veb
import database
import log
import time
import term
import net
import net.http
import net.websocket

const host = '192.168.30.213'
const port = 9000

pub struct App {
	veb.Middleware[Context]
mut:
	wss       &websocket.Server
	logged_in bool
	logger    log.Log
}

pub struct Context {
	veb.Context
}

pub fn (app &App) before_request() {
	$if trace_before_request ? {
		println('[veb] before_request: ${app.req.method} ${app.req.url}')
	}
}

fn main() {
	mut db := database.create_db_connection() or { panic(err) }

	db.close() or { panic(err) }

	mut app := &App{
		wss: new_websocket_server()!
	}

	// use veb's cors middleware to handle CORS requests
	app.use(veb.cors[Context](veb.CorsOptions{
		// allow CORS requests from every domain
		origins: ['*']
		// allow CORS requests with the following request methods:
		allowed_methods: [.get, .head, .patch, .put, .post, .delete]
	}))

	println('
    ################################################
          ⢀⠤⠒⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⢶⣶⣶⠖⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⣹⣿⣿⡃⠀⠀⢀⡀⠀⠀⢀⡀⠀⠀⢀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⢸⣿⣿⣅⣠⣶⣿⣇⣠⣶⣿⣧⣠⣾⣿⡁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡅⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⣹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⣠⣶⣿⣿⠿⠟⠋⠉⠀⠁⠀⠈⠈⠉⠙⠻⠿⣿⣿⣶⣤⡀⠀⠀⠀⠛⠀⠀⠠⣿⠛⠛⠀⠀⢀⣤⣤⣀⡀⠀⠀⢀⣤⣤⣀⠀⠀⢠⣿⡄⠀⠀⣀⣤⣤⡀⠀⠀⢠⣤⡄⠀⢠⡄⠀⢠⡄
    ⢾⣿⡿⠋⠁⢀⣠⣴⣶⣿⣿⣿⣿⣿⣶⣦⣤⣀⠀⠙⠻⣿⣿⠆⠀⠀⣿⠄⠀⠐⣿⠛⠃⠀⠀⣾⠁⠀⢹⡇⠀⠀⣿⠁⠀⠉⠀⠀⠀⣿⠀⠀⠰⣟⠀⠈⣻⠄⠀⢸⡇⠀⠀⠀⢿⣤⢿
    ⠀⠁⠀⣠⣾⣿⣿⠿⠛⠋⠉⠉⠉⠙⠛⠻⢿⣿⣷⣦⡄⠀⠁⠀⠀⠀⠿⠂⠀⠈⠟⠀⠀⠀⠀⠘⠷⠶⠛⠃⠀⠀⠙⠷⠶⠋⠀⠀⠀⠿⠀⠀⠀⠛⠶⠾⠋⠀⠀⠸⠇⠀⠀⠀⢈⡿
    ⠀⠀⠀⠻⠟⠋⠀⣀⣴⣶⣿⣿⣿⣶⣦⣄⠀⠈⠛⠿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠃
    ⠀⠀⠀⠀⠀⠀⢸⣿⡿⠟⠛⠉⠛⠻⢿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠉⠀⠀⣴⣶⣶⣦⠀⠈⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠈⠛⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀

    ######################################################
    🛡️  Server listening on:: http://${host}:${port} 🛡️
    ######################################################
    ')

	veb.run[App, Context](mut app, port)
}

@['/'; get]
pub fn (mut app App) index(mut ctx Context) veb.Result {
	return ctx.html('Hello <b> DFM ENGINEERING! <b>')
}

pub fn (mut app App) ws(mut ctx Context) veb.Result {
	key := ctx.get_header(http.CommonHeader.sec_websocket_key) or { '' }
	if key == '' {
		ctx.error('Invalid websocket handshake. Key is missing.')
		return ctx.redirect('/')
	}
	dump(ctx.req.cookie('token') or { http.Cookie{} }.value)
	wlog('> transferring connection with key: ${key}, to the websocket server ${voidptr(app.wss)} ...')
	ctx.takeover_conn()
	ctx.conn.set_write_timeout(time.infinite)
	ctx.conn.set_read_timeout(time.infinite)
	spawn fn (mut wss websocket.Server, mut connection net.TcpConn, key string) {
		wss.handle_handshake(mut connection, key) or { wlog('handle_handshake error: ${err}') }
		wlog('>> wss.handle_handshake finished, key: ${key}')
	}(mut app.wss, mut ctx.conn, key)
	wlog('> done transferring connection')
	return veb.no_result()
}

fn slog(message string) {
	eprintln(term.colorize(term.bright_yellow, message))
}

fn wlog(message string) {
	eprintln(term.colorize(term.bright_blue, message))
}

fn new_websocket_server() !&websocket.Server {
	mut logger := &log.Log{}
	logger.set_level(.info)
	mut wss := websocket.new_server(.ip, port, '', logger: logger)
	wss.set_ping_interval(100)
	wss.on_connect(fn [mut logger] (mut server_client websocket.ServerClient) !bool {
		server_client.client.logger = logger
		slog('wss.on_connect client.id: ${server_client.client.id} | server_client.client_key: ${server_client.client_key}')
		return true
	})!
	wss.on_close(fn (mut client websocket.Client, code int, reason string) ! {
		slog('wss.on_close client.id: ${client.id} | code: ${code}, reason: ${reason}')
	})
	wss.on_message(fn [mut wss] (mut client websocket.Client, msg &websocket.Message) ! {
		slog('wss.on_message client.id: ${client.id} | msg.opcode: ${msg.opcode} | msg.payload: `${msg.payload.bytestr()}`')
		text := '${client.id} says: "${msg.payload.bytestr()}"'
		// client.write_string(text) or { slog('client.write err: ${err}') return err }
		for i, _ in rlock wss.server_state {
			wss.server_state.clients
		} {
			mut c := rlock wss.server_state {
				wss.server_state.clients[i] or { continue }
			}
			if c.client.get_state() == .open {
				c.client.write_string(text) or {
					slog('error while broadcasting to i: ${i}, ${voidptr(c)}, err: ${err}')
					continue
				}
			}
		}
	})

	slog('Websocket Server initialized, wss: ${voidptr(wss)}')
	return wss
}
