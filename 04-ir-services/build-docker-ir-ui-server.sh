# build the gcc bto images
echo "Building come gcc library"
docker build --file=btobinary.dockerfile -t vkputhukkeril/bto-binary:1.0.0 .
# build the python builder for this server
echo "Building IR UI builder to for dependencies"
docker build --file=remoteserver-builder.dockerfile -t vkputhukkeril/ui-ir-server-builder:1.0.0 .
# compiled smaller bundle
echo "Building final deployment container"
docker build --file=remoteserver.dockerfile -t vkputhukkeril/ui-ir-server:1.0.0 .