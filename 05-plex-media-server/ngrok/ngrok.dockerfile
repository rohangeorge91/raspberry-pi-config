FROM alpine:3.13.5 as ngrok
# https://github.com/sgerrand/alpine-pkg-glibc
ARG GLIBC_VERSION=2.31-r0

RUN set -x \
	&& apk add --no-cache -t .deps ca-certificates \
	# Install glibc on Alpine (required by docker-compose)
	# See also https://github.com/gliderlabs/docker-alpine/issues/11
	&& wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub \
	&& wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/${GLIBC_VERSION}/glibc-${GLIBC_VERSION}.apk \
	&& apk add glibc-${GLIBC_VERSION}.apk \
	&& rm glibc-${GLIBC_VERSION}.apk \
	&& apk del --purge .deps

RUN set -x \
	# Install ngrok (latest official stable from https://ngrok.com/download).
	&& apk add --no-cache curl \
	&& curl -Lo /ngrok.zip https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-arm64.zip \
	&& unzip -o /ngrok.zip -d /bin \
	&& rm -f /ngrok.zip \
	# Create non-root user.
	&& adduser -h /home/ngrok -D -u 6737 ngrok

# Add config script.
COPY --chown=ngrok ngrok.yml /home/ngrok/.ngrok2/
COPY start.sh /

USER ngrok
ENV USER=ngrok

# Basic sanity check.
RUN ngrok --version

EXPOSE 4551

CMD ["/start.sh"]