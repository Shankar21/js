"use strict";

var Network = function() {
	this.io 	= undefined;
	this.url 	= "";
	this.port	= 8008;
}

Network.prototype.getUrl = function() {
	var location = window.location;
	var protocol = location.protocol == "http:" ? "http://" : "https://";
	this.url     = protocol+location.host;
	console.log(this.url);
}

Network.getUrl();