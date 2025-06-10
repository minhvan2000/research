import time

// Simulate expensive computing using sleep function
fn expensive_computing(id int, duration int) {
	println('Executing expensive computing task (${id})...')
	time.sleep(duration * time.millisecond)
	println('Finish task ${id} on ${duration} ms ${time.now().unix_milli()}')
}

fn main() {
	mut threads := []thread{}
	threads << spawn expensive_computing(1, 0)
	threads << spawn expensive_computing(2, 0)
	threads << spawn expensive_computing(3, 0)
	threads << spawn expensive_computing(4, 0)
	threads << spawn expensive_computing(5, 0)
	threads << spawn expensive_computing(6, 0)
	threads << spawn expensive_computing(7, 0)
	threads << spawn expensive_computing(8, 0)
	threads << spawn expensive_computing(9, 0)
	threads << spawn expensive_computing(11, 0)
	threads << spawn expensive_computing(12, 0)
	threads << spawn expensive_computing(13, 0)
	threads << spawn expensive_computing(14, 0)
	threads << spawn expensive_computing(15, 0)
	threads << spawn expensive_computing(16, 0)
	threads << spawn expensive_computing(17, 0)
	threads << spawn expensive_computing(18, 0)
	threads << spawn expensive_computing(19, 0)
	threads << spawn expensive_computing(20, 0)
	threads << spawn expensive_computing(21, 0)
	threads << spawn expensive_computing(22, 0)
	threads << spawn expensive_computing(23, 0)
	threads << spawn expensive_computing(24, 0)
	threads << spawn expensive_computing(25, 0)
	threads << spawn expensive_computing(26, 0)
	threads << spawn expensive_computing(27, 0)
	threads << spawn expensive_computing(28, 0)
	threads << spawn expensive_computing(29, 0)
	threads << spawn expensive_computing(30, 0)
	
	// Join all tasks
	threads.wait()
	println('All jobs finished!')
}