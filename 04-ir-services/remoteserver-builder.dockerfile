FROM vkputhukkeril/bto-binary:1.0.0 AS irBuilder

FROM node:14.16.1-stretch
WORKDIR /home/root/server
# RUN apk update && apk add gcc libc-dev linux-headers libusb-dev make python2 py-pip \
#	&& apk add nodejs && apk add npm
# install the node-sass outside the package.json scope to avoid the long recompile
COPY ./02-remote-server/ui-ir-remote/package.json ./package.json
RUN npm install
COPY ./02-remote-server/ui-ir-remote .
COPY ./ir-codes ./ir-codes
COPY --from=irBuilder /home/root/bto_ir_advanced_cmd ./bto_ir_advanced_cmd
RUN npm run build && rm -rf node_modules && npm install --production
