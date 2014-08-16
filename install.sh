#!/bin/sh

#NodeJS and NPM
sudo apt-get install nodejs npm;

#pi-gpio dependencies
cd ~
mkdir opt
cd opt
git clone git://github.com/quick2wire/quick2wire-gpio-admin.git
cd quick2wire-gpio-admin
make
sudo make install
sudo adduser $USER gpio