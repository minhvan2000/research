module main

import vweb
import database
import time

/* Initial Global Variable */
const port = 8080
const host = '127.0.0.1'

struct App {
	vweb.Context
}

fn main() {
	mut db := database.create_connection()

	mut app := App{}

	println('Running server on http://${host}:${port}')
	vweb.run(app, port)
}

fn (mut app App) time() vweb.Result {
	return app.text(time.now().format())
}


@['/index']
pub fn (mut app App) index() vweb.Result {
	return app.text('Hello world from vweb!')
}
