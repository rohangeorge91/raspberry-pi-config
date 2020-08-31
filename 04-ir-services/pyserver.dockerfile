FROM gcc:latest AS irBuilder
WORKDIR /home/root
# update the apt so that we can get new libusb
RUN apt -y update && apt -y upgrade && apt -y install libusb-1.0-0-dev \
	&& apt -y install python3-pip
RUN git clone https://github.com/Drunkar/bto_ir_advanced_cmd.git
RUN cd bto_ir_advanced_cmd; make; make install
RUN mkdir pyserver
COPY ./01-monitoring pyserver
COPY ./ir-codes pyserver/ir-codes
RUN cd pyserver && pip3 install -r requirements.txt
CMD 'python3 ./monitor.py'
