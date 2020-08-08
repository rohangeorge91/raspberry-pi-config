#!/usr/bin/env python3
import os
import schedule
import time

from libs.cpu import get_cpu_temp
from libs.screen import clear, move
from libs.scheduler import scheduler

last_ac_status = 0
minutes_before_toggle = 3

def turn_on_ac():
	"""Turn on the ac to 24c medium.
	"""
	global last_ac_status
	os.system('bto_advanced_USBIR_cmd -d `cat ../06-remote-server/ir-codes/temp-24-med-blower-ac.txt`')
	last_ac_status = 1

def turn_off_ac():
	"""Turn off the ac.
	"""
	global last_ac_status
	os.system('bto_advanced_USBIR_cmd -d `cat ../06-remote-server/ir-codes/off-ac.txt`')
	last_ac_status = 0


def cpu_based_ac_control():
	"""
	"""
	global last_ac_status
	temp_tag = 'heat_temp'
	move(0, 0)
	temp = get_cpu_temp()
	print("Temp: {:.2f}C".format(temp))
	
	localtime = time.localtime(time.time())
	time_str = ("%02d:%02d" % (localtime.tm_hour, localtime.tm_min + minutes_before_toggle))

	if (temp <= 36 and last_ac_status == 1):	
		print('turning off the ac in %s' % (time_str))
		schedule.clear(temp_tag)
		schedule.every().day.at(time_str).do(turn_off_ac).tag(temp_tag)
		last_ac_status = 0

	elif (temp >= 38 and last_ac_status == 0):
		print('turning on the ac in %s' % (time_str))
		localtime = time.localtime(time.time())
		schedule.clear(temp_tag)
		schedule.every().day.at(time_str).do(turn_on_ac).tag(temp_tag)
		last_ac_status = 1


clear()
job1 = scheduler('heat-monitor', cpu_based_ac_control, 0.5)
try:
	# turn on the ac
	turn_on_ac()
	job1.start()
	job1.join()
except KeyboardInterrupt:
	# stop the ac during a crash
	turn_off_ac()
	# if keyboard interrupt then kill the background thread and wait for death.
	job1.stop_execution()
	job1.join()
	
print('Exiting main Thread')
