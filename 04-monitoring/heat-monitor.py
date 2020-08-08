#!/usr/bin/env python3
from libs.cpu import get_cpu_temp
from libs.screen import clear, move
from libs.scheduler import scheduler


def clear_cpu_information():
	"""Move the location on the console to 0,0 and then print the cpu.
	"""
	move(0, 0)
	temp = get_cpu_temp()
	print("Temp: {:.2f}C".format(temp))


clear()
job1 = scheduler('heat-monitor', clear_cpu_information, 0.5)
try:
	job1.start()
	job1.join()
except KeyboardInterrupt:
	# if keyboard interrupt then kill the background thread and wait for death.
	job1.stop_execution()
	job1.join()
	
print('Exiting main Thread')
