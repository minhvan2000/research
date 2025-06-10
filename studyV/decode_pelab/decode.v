module decode

import time

pub struct JSON_MESS {
mut:
	app_code          string = 'Unknown'
	sampling_interval u16
	timestamp         u32
	list_data         []DATA_MESSAGE
}

struct DATA_MESSAGE {
mut:
	data_idx      string = 'Unknown'
	counter_value u32
	reverse       u16
	alarm         u8
	battery       u16
}

pub fn handle_decode(data_param string) string {
	mut result := '[{"name":"app","value":"PELAB"},'

	data_value := handle_data_frame(data_param)

	result += '{"name":"messageType","value":"${data_value.app_code}"},'

	result += '{"name":"System","value":{"Message":"Information System","Sampling Interval (m)":${data_value.sampling_interval},"Timestamp":"${time.unix(data_value.timestamp).custom_format('DD-MM-YYYY HH:mm:ss')}"}},'

	mut str_data := '['

	for item in data_value.list_data {
		str_data += '{"idx":"${item.data_idx}","Counter Value":"Water counted as ${item.counter_value} pulses","Reverse":"Water counted down ${item.reverse} pulses","Alarm":"${get_data_alarm(item.alarm,
			item.battery)}","Battery":"${item.battery} mV"},'
	}

	str_data = str_data[0..str_data.len - 1] + ']'

	if str_data.len > 0 {
		result += '{"name":"Water Meters","value":{"Message":"Data Packet","List Data":[${str_data}]}},'
	}

	result = result[0..result.len - 1] + ']'

	return result
}

fn handle_data_frame(data string) JSON_MESS {
	length_data := data.len

	mut message_json := JSON_MESS{'Unknown', 0, 0, []}

	if length_data >= 14 {
		mut arr_byte := data.split('')

		hex_app_code := '0x${arr_byte[0..2].join('')}'
		hex_sampling_interval := '0x${arr_byte[2..6].join('')}'
		hex_timestamp := '0x${arr_byte[6..14].join('')}'

		arr_charts_message := arr_byte[14..].clone()

		mut arr_message := []string{}

		int_part := arr_charts_message.len / 20 * 20
		fra_part := arr_charts_message.len % 20

		mut i := 0
		for i < int_part {
			arr_message << arr_charts_message[i..i + 20].join('')
			i += 20
		}

		if fra_part > 0 {
			arr_message << arr_charts_message[i..i + fra_part].join('')
		}

		message_json.app_code = match hex_app_code {
			'0x69' {
				'Daily'
			}
			'0x70' {
				'Alarm'
			}
			else {
				'Unknown'
			}
		}

		message_json.sampling_interval = hex_sampling_interval.u16()
		message_json.timestamp = hex_timestamp.u32()
		message_json.list_data << handle_data_message(arr_message)
	}

	return message_json
}

fn handle_data_message(arr_message []string) []DATA_MESSAGE {
	mut result_data := []DATA_MESSAGE{}

	for mess in arr_message {
		if mess.len == 20 {
			chars := mess.split('')
			hex_data_idx := '0x${chars[0..2].join('')}'
			hex_counter_value := '0x${chars[2..10].join('')}'
			hex_reverse := '0x${chars[10..14].join('')}'
			hex_alarm := '0x${chars[14..16].join('')}'
			hex_battery := '0x${chars[16..].join('')}'

			data_alarm := hex_alarm.u8()
			data_idx := 'Packet number ${hex_data_idx.int()}'
			counter_value := hex_counter_value.u32()
			reverse := hex_reverse.u16()
			battery := hex_battery.u16()

			result_data << DATA_MESSAGE{data_idx, counter_value, reverse, data_alarm, battery}
		} else {
			result_data << DATA_MESSAGE{}
		}
	}

	return result_data
}

fn get_data_alarm(data_alarm u8, battery u16) string {
	mut arr_alarm := []string{}

	if data_alarm & 0b001 == 1 {
		arr_alarm << 'Reverse flow'
	}

	if data_alarm & 0b010 == 2 {
		arr_alarm << 'Tampering'
	}

	if data_alarm & 0b100 == 4 {
		arr_alarm << 'Magnetic Field'
	}

	if battery > 3000 && battery <= 3200 {
		arr_alarm << 'Low Battery'
	}

	if battery <= 3000 {
		arr_alarm << 'Battery Depleted'
	}

	if arr_alarm.len == 0 {
		arr_alarm << 'No Alarms'
	}

	return arr_alarm.join(' & ')
}
