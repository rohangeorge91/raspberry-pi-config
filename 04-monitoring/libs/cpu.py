import psutil

# messages
total_core_msg = 'Total Core (physical and logical) => {0}'
load_average_msg = 'Load Average => load: {:.2f} idle: {:.2f} wait: {:.2f}'
cpu_avg_temp = 'Current temp: {:.1f}C'
cpu_freq_str = 'CPU {:2d} => cur: {:4d}MHz >> util: {:3d}% (min: {:4d}MHz max: {:4d}MHz)'


def print_cpu_information():
	"""Print out the cpu stats on the console.
	"""
	# getting the information
	total_cores = psutil.cpu_count()
	cpu_util = psutil.cpu_percent(percpu=True)
	cpu_freq = psutil.cpu_freq(percpu=True)
	cpu_zipped_value = zip(cpu_util, cpu_freq, range(total_cores))
	# the below key is exclusively for Rasp-pi
	avg_cpu_temp = psutil.sensors_temperatures().get('cpu_thermal')
	# print all cpu
	print(total_core_msg.format(total_cores))
	if avg_cpu_temp is not None:
			print(cpu_avg_temp.format(avg_cpu_temp[0].current))
	# load average
	print(load_average_msg.format(*psutil.getloadavg()))
	# print info for each core
	[print(cpu_freq_str.format(index, int(freq.current), int(util), int(
			freq.min), int(freq.max))) for util, freq, index in cpu_zipped_value]

def get_cpu_temp():
	# the below key is exclusively for Rasp-pi
	avg_cpu_temp = psutil.sensors_temperatures().get('cpu_thermal')
	return avg_cpu_temp[0].current
