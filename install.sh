#!/bin/sh

#NodeJS and NPM - Packages weren't new enough
sudo mkdir -p /opt/nodejs;
cd /opt/nodejs;
wget https://gist.github.com/raw/3245130/v0.10.24/node-v0.10.24-linux-arm-armv6j-vfp-hard.tar.gz;
tar -xvf node-v0.10.24-linux-arm-armv6j-vfp-hard.tar.gz;
ln -s /opt/nodejs/node-v0.10.24-linux-arm-armv6j-vfp-hard/bin/node /usr/local/sbin/;
ln -s /opt/nodejs/node-v0.10.24-linux-arm-armv6j-vfp-hard/bin/npm /usr/local/sbin/;
#pi-gpio dependencies
cd ~
mkdir opt
cd opt
git clone git://github.com/quick2wire/quick2wire-gpio-admin.git
cd quick2wire-gpio-admin
make
sudo make install
sudo adduser $USER gpio