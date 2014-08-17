#!/usr/bin/node
var debug = require("debug")("relay"),
	gpio = require("pi-gpio");
require('when/es6-shim/Promise');

function Relay(pinNumber) {
	if (pinNumber === undefined) {
		pinNumber = 7;
	}
	this.pinNumber = pinNumber;
}

Relay.prototype.gpioOpen = function (tries) {
	if (tries === undefined) {
		tries = 0;
	}
	debug("Opening pin " + this.pinNumber);
	return new Promise(function (resolve, reject) {
		gpio.open(this.pinNumber, "output", function (err) {
			if (err) {
				if (tries < 3) {
					debug("Pin error, retrying");
					return this.gpioClose()
						.then(function () {
							return this.gpioOpen(tries++);
						}.bind(this));
				}
				return reject(err);
			}
			debug("Pin " + this.pinNumber + " opened");
			return resolve();
		}.bind(this));
	}.bind(this))
		.catch(function (err) {
			console.error("Caught pin open error");
			console.error(err.stack);
		});
};

Relay.prototype.gpioClose = function () {
	return new Promise(function (resolve, reject) {
		debug("Closing pin " + this.pinNumber);
		gpio.close(this.pinNumber, function (err) {
			if (err) {
				return reject(err);
			}
			return resolve();
		}.bind(this));
	}.bind(this))
		.catch(function(err) {
			console.error("Couldn't close pin " + this.pinNumber);
			console.error(err.stack);
		}.bind(this));
};

Relay.prototype.gpioWrite = function (value) {
	return this.gpioOpen()
		.then(function () {
			debug("Writing " + value + " to pin " + this.pinNumber);
			return new Promise(function (resolve, reject) {
				gpio.write(this.pinNumber, value, function (err) {
					if (err) {
						reject(err);
					}
					debug("Wrote " + value + " to pin " + this.pinNumber);
					resolve();
				}.bind(this));
			}.bind(this));
		}.bind(this));
};

Relay.prototype.pulse = function (duration) {
	debug("Writing 0");
	return this.gpioWrite(0)
		.then(function () {
			debug("0 successfully written, waiting");
			return new Promise(function (resolve) {
				debug("Waiting " + duration + "ms");
				setTimeout(function () {
					debug("Writing 1");
					this.gpioWrite(1);
					resolve();
				}.bind(this), duration);
			}.bind(this));
		}.bind(this));
};

module.exports = Relay;