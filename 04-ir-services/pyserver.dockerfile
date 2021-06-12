FROM vkputhukkeril/py-ir-server-builder:1.0.0 as pythonBuilder

FROM python:3.8.9-alpine3.13
WORKDIR /home/root/server
# the below is needed for the bto_ir library even with the compiled 
RUN apk update && apk add libusb-dev
COPY --from=pythonBuilder	/home/root/server .
ENV PATH="/home/root/server/bto_ir_advanced_cmd:${PATH}" ir_codes_path='/home/root/server/ir-codes' \
	PYTHONPATH="${PYTHONPATH}:/home/root/server/dependencies"
CMD "./heat-monitor.py"
