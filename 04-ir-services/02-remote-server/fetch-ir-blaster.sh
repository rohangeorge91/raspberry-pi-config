#!/bin/bash

sudo apt -y install git build-essential cmake
sudo apt -y install libusb-1.0-0-dev

git clone https://github.com/Drunkar/bto_ir_advanced_cmd.git

cd bto_ir_advanced_cmd

make;
sudo make install