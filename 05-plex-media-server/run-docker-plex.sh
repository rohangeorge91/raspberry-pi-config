#!/bin/bash
docker run -d \
  --name=plex \
  --net=host \
  -e PUID=1000 \
  -e PGID=1000 \
  -e VERSION=docker \
  -v /home/rohan/raspberry-pi/05-plex-media-server/config:/config \
  -v /media/media-drive/additional_videos:/additional_videos \
  -v /media/media-drive/movies:/movies \
  -v /media/media-drive/music:/music \
  -v /media/media-drive/music_videos:/music_videos \
  -v /media/media-drive/personal_movies:/personal_movies \
  -v /media/media-drive/shows:/shows \
  --restart unless-stopped \
  linuxserver/plex:latest
