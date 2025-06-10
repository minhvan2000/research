module database

import db.sqlite

pub fn create_db_connection() !sqlite.DB {
	println('Connecting Database ...')
	mut db := sqlite.connect('database.db')!
	return db
}
