module database

import db.sqlite

pub fn create_connection() !sqlite.DB {
	mut db := sqlite.connect('app.db')!
	return db
}
