garage-door-js
==============

A connected garage application, running on Raspberry Pi, NodeJS

Parts List
----------
USB Bluetooth Adapter - http://www.amazon.com/gp/product/B005Z5HT2M/ref=oh_aui_detailpage_o01_s00?ie=UTF8&psc=1
5V Relay for Arduino/Rasperry Pi - http://www.amazon.com/gp/product/B00E0NTPP4/ref=oh_aui_detailpage_o02_s00?ie=UTF8&psc=1
Garage Door Sensor - http://www.amazon.com/gp/product/B00CAIVNM4/ref=oh_aui_detailpage_o03_s00?ie=UTF8&psc=1

Raspberry Pi
USB Wifi Adapter

Wiring
------

Devices
-------
Garage Door Sensor

 * Has a state, we simply poll for data using the attached GPIO pins
 * Returns "0" when sensor close, "1" when the are apart.
 * The sensor is a bit jittery, probably best to wait for an average.

Relay

 * We write a boolean to the GPIO pin
 * 0 - Relay is closed, current flows, 1 - Relay is open, no current.




