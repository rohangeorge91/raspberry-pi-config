FROM gcc:latest AS irBuilder
WORKDIR /home/root
# update the apt so that we can get new libusb
RUN apt -y update && apt -y upgrade && apt -y install libusb-1.0-0-dev
RUN git clone https://github.com/Drunkar/bto_ir_advanced_cmd.git
RUN cd bto_ir_advanced_cmd; make; make install
RUN mkdir build
RUN mv /usr/local/bin/bto_advanced_USBIR_cmd /home/root/build/bto_advanced_USBIR_cmd

FROM python:3.7.9-stretch
WORKDIR /home/root/pyserver
COPY --from=irBuilder /home/root/build/bto_advanced_USBIR_cmd /usr/local/bin/bto_advanced_USBIR_cmd
COPY ./01-monitoring .
COPY ./ir-codes ./ir-codes
RUN pip3 install -r requirements.txt
CMD 'python ./monitor.py'