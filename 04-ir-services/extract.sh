#!/bin/bash
first=`lsusb | grep 22ea | awk '{ print $2 }'`
second=`lsusb | grep 22ea | awk '{ print $4 }' | cut -c 1-3`
usbstr=`/dev/bus/usb/$first/$second`

echo `$usbstr`

