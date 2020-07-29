#!/bin/bash

# if not already installed, install the rpi-eeprom package:
sudo apt install rpi-eeprom
sudo vl805 -w vl805_fw_0137ac.bin
sudo reboot