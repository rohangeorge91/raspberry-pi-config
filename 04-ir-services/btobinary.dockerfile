FROM alpine:3.13.5
WORKDIR /home/root
# update the apt so that we can get new libusb
RUN apk update && apk add gcc libc-dev linux-headers libusb-dev make git \
	&& git clone https://github.com/Drunkar/bto_ir_advanced_cmd.git \
	&& cd bto_ir_advanced_cmd; make; make install
RUN mkdir server