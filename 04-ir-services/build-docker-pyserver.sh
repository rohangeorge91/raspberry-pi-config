# build the gcc bto images
echo "Building come gcc library"
docker build --file=btobinary.dockerfile -t vkputhukkeril/bto-binary:1.0.0 .
# build the python builder for this server
echo "Building python builder to for dependencies"
docker build --file=pyserver-builder.dockerfile -t vkputhukkeril/py-ir-server-builder:1.0.0 .
# compiled smaller bundle
echo "Building final deployment container"
docker build --file=pyserver.dockerfile -t vkputhukkeril/py-ir-server:1.0.1 .