# Below are the list of command to help plex server

# list all groups on the system
# Reference: https://linuxize.com/post/how-to-list-groups-in-linux/
groups

# making new groups
# https://linuxize.com/post/how-to-create-groups-in-linux/
# https://www.howtogeek.com/50787/add-a-user-to-a-group-or-second-group-on-linux/
groupadd plex-user

# add group to user
# https://www.howtogeek.com/50787/add-a-user-to-a-group-or-second-group-on-linux/
usermod -a -G plex-user rohan