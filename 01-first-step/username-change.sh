#!/bin/bash

# Reference https://www.hepeng.me/changing-username-and-hostname-on-ubuntu/

#Info
printf "Please enter a password for sudo operations...\n"
sudo printf "Done... Hopefully the password will be retained in script execution...\n"
# Username <- change this 
NEW_USER_NAME=$username
# change the root password
printf "set password for the root user...\n"
echo "$username:$password" | sudo chpasswd

# kill from current user else file will be locked.
exit
# log into ROOT
printf "login into root account... please type the password again\n"
sudo login root

# change username
usermod -l $NEW_USER_NAME -d /home/$NEW_USER_NAME -m ubuntu
# change the group 
groupmod -n $NEW_USER_NAME ubuntu
# change the hostname
echo "rasp-pi4" | sudo tee /etc/hostname

# exit from root user
exit
