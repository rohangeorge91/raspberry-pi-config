# Introduction
Simple project to configure a ubuntu-server 20 on a raspberry-pi4 8gb.

## submodules
 1. to setup the first user from the default ubuntu user.
 2. to configure the system
    1. copy configuration to make the bash a bit more friendly
    2. update and upgrade the os
    3. install tmux for each multiplexing the terminal
    4. rpi-update software to update the raspberry-pi firmware to latest.
    5. Install git, and tools to build c++ code.
    6. Install wireless-tools, net-tools, nmap and isc-dhcp-server. The reason is to help debug the network traffic and if possible start a static ip server (note the static ip is a bit problematic)
    7. Upgrade to pip3 install templating library for yaml which will template and prepare a configuration for netplan. Remember to source .env with the require data
    8. Copy the prepare file for wireless network.
    9. `htop` for seeing the process in a console GUI
    10. Install docker (help with containerizing solution like plex-server, or even the remote ui server)
    11. make a swapfile for the server, which help if the memory is overloaded.
    12. install vcgencmd, psutil for the monitoring the raspberry
    13. uhubctl to control the usb (hope was to make this control the power to the usb)
    14. libusb-1.0.0 to control the ir-blaster via user.
	3. Install ssh-server and allow ssh on the firewall
	4. Prepare disk configuration (this to allow usb3 support the external hard-disk - still a WIP)
	5. Monitoring tools - A simple tool to monitor the cpu, freq, utilization and temperature of the server. There are also helper function to add with the GPIO programming of the raspberry pi.
	6. A simple installation file to download the plex-server for media. (`TODO:` we need to get a script to start the server and get it running, volume mount the external disk and check if there is a better way to do this with processing the video at runtime)
	7. Remote server - download the binary for the blaster (if possible convert to python and figure out another way since the c++ code is rally confusing)