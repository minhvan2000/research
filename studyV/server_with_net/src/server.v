module main

import net.http { Request, Response, Server }
import database
import time
import log
// import json

const ip_server = '192.168.30.213'
const http_port = 9000
const boundary_start = 'boundary='

// Struct Handler
struct ExampleHandler {
pub mut:
	logged_in bool
	logger    log.Log
}

// Struct FileData
struct FileData {
pub:
	filename     string
	content_type string
	data         string
}

fn main() {
	mut db := database.create_db_connection() or { panic(err) }

	db.close() or { panic(err) }

	mut server := Server{
		addr:                 '${ip_server}:${http_port}'
		handler:              ExampleHandler{}
		show_startup_message: false
	}
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

    ################################################
    🛡️  Server listening on:: http://${ip_server}:${http_port} 🛡️
    ################################################
    ')
	server.listen_and_serve()
}

fn (mut h ExampleHandler) handle(req Request) Response {
	h.setup_logger()

	mut res := Response{
		body: ''
	}

	// sw := time.new_stopwatch()

	// defer {
	// 	h.info('took: ${sw.elapsed().microseconds()}µs, status: ${res.status_code}, method: ${req.method}, url: ${req.url}, data: ${req.data}')
	// }

	// mut status_code := 200

	method := req.method
	arr_url := req.url.split('/')

	// header_content_type := req.header.get(.content_type) or { 'unknown' }.split(';').map(it.trim_left(' \t'))

	data_temp_1, _ := parse_form_from_request(req) or {
		// Bad request
		(map[string]string{}), (map[string][]http.FileData{})
	}

	println(data_temp_1)

	handle_method := match method {
		.get {
			println('GET Method')

			// h.router_auth(req.url, req.method, req.data)
			{
				'method': 'get'
			}
		}
		.post {
			println('POST Method')
			println(arr_url)

			// router := match arr_url[3] {
			// 	'auth' {}
			// 	else {
			// 		println('Unknown router')
			// 	}
			// }

			// println(router)

			// res.header.set(.content_type, 'text/html')
			// h.index()
			{
				'method': 'post'
				'url':    req.url
			}
		}
		else {
			println('Unknown Method')
			// h.warn('404 - Not found')
			// status_code = 404
			// 'Not found\n'
			{
				'method': 'Unknown'
			}
		}
	}

	println(handle_method)
	// res.status_code = status_code
	return res
}

// @['/'; get]
// pub fn (mut handle ExampleHandler) index() string {
// 	return 'Hello <b> DFM ENGINEERING! <b>'
// }

// Parse Request Header
//!(map[string]string, map[string][]http.FileData)
fn parse_form_from_request(request Request) !(map[string]string, map[string][]http.FileData) {
	if request.method !in [http.Method.post, .put, .patch] {
		return map[string]string{}, map[string][]http.FileData{}
	}
	ct := request.header.get(.content_type) or { '' }.split(';').map(it.trim_left(' \t'))
	if 'multipart/form-data' in ct {
		boundaries := ct.filter(it.starts_with(boundary_start))
		if boundaries.len != 1 {
			return error('detected more that one form-data boundary')
		}
		boundary := boundaries[0].all_after(boundary_start)
		if boundary.len > 0 && boundary[0] == `"` {
			// quotes are send by our http.post_multipart_form/2:
			return http.parse_multipart_form(request.data, boundary.trim('"'))
		}
		// Firefox and other browsers, do not use quotes around the boundary:
		println(http.parse_multipart_form(request.data, boundary))
	}
	return http.parse_form(request.data), map[string][]http.FileData{}
}

// Setup Logger
fn (mut handle ExampleHandler) setup_logger() {
	handle.logger.set_level(.debug)

	handle.logger.set_full_logpath('./logs/log_${time.now().ymmdd()}.log')
	handle.logger.log_to_console_too()
}

pub fn (mut handle ExampleHandler) warn(msg string) {
	handle.logger.warn(msg)

	handle.logger.flush()
}

pub fn (mut handle ExampleHandler) info(msg string) {
	handle.logger.info(msg)

	handle.logger.flush()
}

pub fn (mut handle ExampleHandler) debug(msg string) {
	handle.logger.debug(msg)

	handle.logger.flush()
}
