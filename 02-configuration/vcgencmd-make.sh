#!/bin/bash

sudo apt-get install git build-essential cmake
git clone https://github.com/raspberrypi/userland.git
cd userland
./buildme --aarch64
sudo mkdir -p /opt/vc/bin
sudo mkdir -p /opt/vc/lib
sudo cp ./build/bin/* /opt/vc/bin
sudo cp ./build/lib/*.so /opt/vc/lib
sudo chmod -R 755 /opt/vc
sudo chown -R root:root /opt/vc
sudo vi /etc/ld.so.conf.d/rpi-lib-bin.conf

# enable video for username
sudo usermod -aG video rohan
