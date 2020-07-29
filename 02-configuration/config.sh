#!/bin/bash

# push configuration for easy use
cp ./config/bashrc.sh ~/.bashrc
cp ./config/bash_aliases.sh ~/.bash_aliases
cp ./config/tmux.conf ~/.tmux.conf
cp ./config/profile.sh ~/.profile

# install tmux on the server
sudo apt -y update
sudo apt -y upgrade
sudo apt -y install tmux

# install update for raspberry pi4
sudo curl -L --output /usr/bin/rpi-update https://raw.githubusercontent.com/Hexxeh/rpi-update/master/rpi-update && sudo chmod +x /usr/bin/rpi-update

# just in-case installation of software to build certain things
sudo apt -y install git build-essential cmake

# install the wifi adapter.
sudo apt -y install wireless-tools
# install network tools for help check for network problems
sudo apt -y install net-tools
# scan all ip on the network
sudo apt -y install nmap
# static dhcp server for constant ip
sudo apt -y install isc-dhcp-server

# install pip3 for Raspberry command and for yaml configuration
sudo apt -y install python3-pip
# install yaml processor to make templating a bit easier
pip3 install ruamel.yaml
# prepare the template based on the env
./prepareConfig.py

# wifi and network settings
sudo cp ./config/50-cloud-init.yaml /etc/netplan/50-cloud-init.yaml

# install additional tools for process managaments
sudo apt -y install htop

USER_NAME=$username
# install docker and do necessary steps
sudo apt -y install docker.io
sudo systemctl enable --now docker
sudo usermod -aG docker $USER_NAME

# create a swap sector in ubuntu (server will have a lot of request so ram may get full a swap sector ensure that it can service the request
# without stalling everyone else)
sudo fallocate -l 16G /swapfile
# count is the size of the partition 16384 - 16GB so 16384 * blocksize (1024)
sudo dd if=/dev/zero of=/swapfile bs=1024 count=16777216
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# add always for the start of the OS.
sudo echo "/swapfile swap swap defaults 0 0" >> /etc/fstab
# restart the server to check the swap file is attached during server start
# reboot

# show the swap sectors
sudo swapon --show
# show memory usage.
sudo free -h

## sudo pip install setuptools
pip3 install vcgencmd
pip3 install psutil

# install a service to control power to the usb
sudo apt -y install uhubctl

# install libusb for the remote ir
sudo apt -y install libusb-1.0-0-dev
