module main

import time

@[table: 'users']
struct User {
mut:
	id                int    @[primary; sql: serial]
	full_name         string @[required; sql_type: 'TEXT']
	email             string @[required; sql_type: 'TEXT'; unique]
	password          string @[required; sql_type: 'TEXT']
	company_id        string @[required; sql_type: 'TEXT'] // TODO: Research type ref of the sqlite
	phone_number      string @[required; sql_type: 'TEXT']
	address           string @[sql_type: 'TEXT']
	avatar            string @[sql_type: 'TEXT']
	role_id           string @[required; sql_type: 'TEXT']
	status            string @[default: 'unknown'; required; sql_type: 'TEXT'] // TODO: Research enum in the sqlite
	mode              string @[required; sql_type: 'TEXT']                     // TODO: Research enum in the sqlite
	businesses        bool   @[required]
	is_delete         bool
	token_verify      string  @[sql_type: 'TEXT']
	time_token_expire ?string @[sql_type: 'TIMESTAMP']
	lasted_access     ?string @[sql_type: 'TIMESTAMP']
	created_at        string  @[default: 'CURRENT_TIMESTAMP']
	updated_at        ?string @[sql_type: 'TIMESTAMP']
	deleted_at        ?string @[sql_type: 'TIMESTAMP']
}
