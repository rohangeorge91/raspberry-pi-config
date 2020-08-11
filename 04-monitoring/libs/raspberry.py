from vcgencmd import Vcgencmd
from gpiozero import LED

# for more information on the pin layout of the raspberry pi 4 please check the file
# 04-monitoring/libs/raspberry-gpio.png

# 4 GPIO on the raspberry pi 4 (PIN 7)
led_17 = LED(4)


def get_rasp_information():
    """Print out the raspberry pi 4 library information to the console.
    """
    vcgm = Vcgencmd()
    output = vcgm.version()
    print(output)


def set_fan_gpio_on():
    """Set the GPIO-7 on the raspberry pi 4. 
    """
    led_17.on()


def set_fan_gpio_off():
    """Set the GPIO-7 off the raspberry pi 4. 
    """
    led_17.off()
