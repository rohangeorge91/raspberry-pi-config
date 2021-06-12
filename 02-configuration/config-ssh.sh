#!/bin/bash

# install ssh-server
sudo apt -y update
sudo apt -y upgrade
sudo apt -y install openssh-server

# start the service
sudo systemctl status ssh

# configure the firewall to user ssh port
sudo ufw allow ssh
