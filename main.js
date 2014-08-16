#!/usr/bin/node
var Relay = require("./lib/relay");

var relay = new Relay(7);
relay.toggle();