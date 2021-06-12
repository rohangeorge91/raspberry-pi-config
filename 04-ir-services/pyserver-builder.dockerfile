FROM vkputhukkeril/bto-binary:1.0.0 AS irBuilder

FROM python:3.8.9-alpine3.13
WORKDIR /home/root/server
RUN apk update && apk add --update gcc libc-dev linux-headers libusb-dev
COPY ./01-monitoring .
COPY ./ir-codes ./ir-codes
COPY --from=irBuilder /home/root/bto_ir_advanced_cmd ./bto_ir_advanced_cmd
RUN pip3 install --target=/home/root/server/dependencies -r requirements.txt
