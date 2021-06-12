import threading
import schedule

import time


class scheduler (threading.Thread):
    """scheduler which starts of a thread to monitor the cpu in the background.

    Args:
                    threading (Thread): The thread library which is used for the scheduler.
    """

    def __init__(self, name, job, interval=2, do_job_once=True):
        """Construct a class with name being used for thread-name and job-name.
        The job being a function which must be executed based on the interval,
        has to be executed at-leasy onces.

        Args:
                        name (String): The name of the thread, it also used for the name of the scheduler.
                        job (Function): A function which will be called by the scheduler.
                        interval (int, optional): The schedule time in seconds. Defaults to 2.
                        do_job_once (bool, optional): If the job needs to be executed once before scheduler starts. Defaults to True.
        """
        threading.Thread.__init__(self)
        self.name = name
        self.job_name = 'task-%s' % (name)
        self.job = job
        self.interval = interval
        self.do_job_once = do_job_once
        self.continue_execution = True
        self.lock = threading.Lock()

        schedule.every(interval).seconds.do(self.job).tag(self.job_name)

    def stop_execution(self):
        """stops the thread and clears the job from the scheduler.
        """
        self.lock.acquire()
        self.continue_execution = False
        schedule.clear(self.job_name)
        self.lock.release()

    def run(self):
        """The method to start the process.
        """
        print("Starting thread => %s" % (self.name))
        # run onces before the scheduler
        if (self.do_job_once):
            self.job()
        # till continue execute
        while self.continue_execution:
            schedule.run_pending()
            time.sleep(self.interval)
        # exit the thread with a message
        print("Exited thread => %s" % (self.name))
