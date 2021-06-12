FROM vkputhukkeril/ui-ir-server-builder:1.0.0 AS uiServerRuntime

FROM node:14.16.1-alpine3.13
WORKDIR /home/root/server
# the below is needed for the bto_ir library even with the compiled 
RUN apk update && apk add libusb-dev
COPY --from=uiServerRuntime	/home/root/server .
ENV PATH="/home/root/server/bto_ir_advanced_cmd:${PATH}" ir_codes_path='../ir-codes'
CMD npm start
