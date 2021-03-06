var io = undefined;

(function(window) {
	"use strict";

	var Firebox = function() {
		this.io 		= undefined;
		this.socket		= undefined;
		this.url 		= "http://clubfirebox.com";
		this.port		= 8008;
		this.interval	= {
			load_io: 		0,
			load_socket: 	0
		};
	};

	Firebox.prototype = {
		_loader: function() {
			var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.1/socket.io.js'; var ss = document.getElementsByTagName('script')[0]; ss.parentNode.insertBefore(s, ss);
			this._checkIO();
		},

		_checkIO: function() {
			if(io === undefined){
				var self = this;
				this.interval.load_io = setInterval(function(){self._checkIO();}, 1000);
			}else{
				this.io = io;
				clearInterval(this.interval.load_io);
				this._start();
			}
		},

		_start: function() {
			this.socket = this.io.connect(this.url+':'+this.port, {reconnection: true, reconnectionAttempts: 5, reconnectionDelay: 2000, reconnectionDelayMax: 2200});

			this.socket.on('connecting', function () {});

		    this.socket.on('connect', function () {});

		    this.socket.on('disconnect', function () {});
		},

		_load: function(){
			var self 		= this;
			
			if(this.socket === undefined){
				this.interval.load_socket = setInterval(function(){self._load();}, 1000);
			}else{
				var href 		= window.location.href;
				var data		= {
					idn_uid:this.getCookie("firebox_stat_identify"), 
					idn_token:this.getCookie("firebox_stat_token"), 
					href: href
				};

				clearInterval(this.interval.load_socket);
				this.socket.emit('check_user', data);
			}
		},

		getCookie: function(name) {
			var matches = document.cookie.match(new RegExp(
		    	"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		  	));
		  	return matches ? decodeURIComponent(matches[1]) : undefined;
		}
	};

	window.Firebox = new Firebox();
	window.Firebox._loader();
}(window));

Firebox._load();
