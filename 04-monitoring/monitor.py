#!/usr/bin/env python3
from libs.cpu import print_cpu_information
from libs.screen import clear, move
from libs.scheduler import scheduler

def clear_cpu_information():
    """Move the location on the console to 0,0 and then print the cpu.
    """
    move(0, 0)
    print_cpu_information()


# clear the console and then tries to the display the information for the first time, then
# schedules a cron to the same job again for a certain amount of time.
clear()
job1 = scheduler('cpu-monitor', clear_cpu_information, 2)
# start the thread for the job.
try:
    job1.start()
    job1.join()
except KeyboardInterrupt:
    # if keyboar interrupt then kill the background thread and wait for death.
    job1.stop_execution()
    job1.join()

print('Exiting main Thread')
