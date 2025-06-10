module main

import os
import decode

fn main() {
	payload_full := os.args[1] or { '' }

	data_decode := decode.handle_decode(payload_full)

	print(data_decode)
}
