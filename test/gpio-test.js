#!/usr/bin/node
var gpio = require("pi-gpio");

function writeToPin() {
	gpio.open(7, "output", function(err) {     // Open pin 16 for output
		gpio.write(7, 1, function(err, value) {          // Set pin 16 high (1)
			console.log(value);
			gpio.close(7);                     // Close pin 16
		});
	});
}

writeToPin();
