#!/usr/bin/node
var debug = require("debug")("relay"),
	gpio = require("pi-gpio");
require('when/es6-shim/Promise');

function Relay(pinNumber) {
	if(pinNumber === undefined) {
		pinNumber = 7;
	}
	this.pinNumber = pinNumber;
}

Relay.prototype.gpioOpen = function (tries) {
	if(tries === undefined) {
		tries = 0;
	}
	return new Promise(function (resolve, reject) {
		gpio.open(this.pinNumber, "output", function (err) {
			if (err) {
				if(tries < 3) {
					return this.gpioClose()
						.then(function() {
							this.gpioOpen(tries++);
						}.bind(this));
				}
				return reject(err);
			}
			return resolve();
		}.bind(this));
	}.bind(this));
};

Relay.prototype.gpioClose = function () {
	return new Promise(function (resolve, reject) {
		gpio.close(this.pinNumber, function (err) {
			if (err) {
				return reject(err);
			}
			return resolve();
		});
	}.bind(this));
};

Relay.prototype.gpioWrite = function (value) {
	return this.gpioOpen()
		.then(function () {
			return new Promise(function (resolve, reject) {
				gpio.write(this.pinNumber, value, function (err) {
					if (err) {
						reject(err);
					}
					resolve();
				});
			}.bind(this));
		}.bind(this))
};

Relay.prototype.pulse = function (duration) {
	debug("Writing 0");
	this.gpioWrite(0)
		.then(function () {
			return new Promise(function (resolve) {
				debug("Waiting " + duration + "ms");
				setTimeout(function () {
					debug("Writing 1");
					this.gpioWrite(1);
					resolve();
				}.bind(this), duration);
			});
		}.bind(this))
		.then(function () {
			debug("Closing GPIO");
			this.gpioClose();
		}.bind(this))
};

module.exports = Relay;