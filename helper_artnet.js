var dgram = require('dgram');

var ArtNet = function(config) {
	if (typeof config !== "object" || config === null) {
		config = {};
	}
	this.host = "255.255.255.255";
	if (typeof config.host === "string") {
		this.host = config.host;
	}
	this.port = 6454;
	if (typeof config.port === "number") {
		this.port = config.port;
	}
	this.refresh_rate = 4000;
	if (typeof config.refresh === "number") {
		this.refresh_rate = config.refresh;;
	}

	var universe = 0;
	if (typeof config.universe === "number") {
		universe = config.universe;
	}

	this.socket = dgram.createSocket("udp4");
	if (typeof config.iface === "string" &&
			config.iface !== "") {
		socket.bind(port, config.iface);
	}

	this.data = this.create_package(universe, 512);

	this.t_send = null;
	this.t_refresh = null;
	this.need_update = true;

	this.update();
};

ArtNet.prototype.create_package = function (universe, length) {
	//var length = 512;
	if (length % 2) length += 1;

	var data = Buffer.alloc(18 + length, 0);
	// write Header:
	data.write('Art-Net', 0);
	// Op-Code:
	data.writeUInt8(0,   8);
	data.writeUInt8(80,  9);
	// Protocol verioni (hi + lo):
	data.writeUInt8(0,  10);
	data.writeUInt8(14, 11);
	// Sequence
	data.writeUInt8(0,  12);
	// Physical
	data.writeUInt8(0,  13);
	// Universe:
	data.writeUInt16LE(universe, 14);
	data.writeUInt16BE(length, 16);

	return data;
};

ArtNet.prototype.write = function() {
	var _this = this;

	if (this.t_refresh) {
		clearTimeout(this.t_refresh);
		this.t_refresh = null;
	}

	this.socket.send(this.data, 0, this.data.length,
			this.port, this.host, function(err) {
		if (err) throw err;
	});
	console.log(this.data);
	console.log("send", new Date());

	this.t_refresh = setTimeout(function() {
		_this.t_refresh = null;

		_this.update();
	}, _this.refresh_rate);
};

ArtNet.prototype.update = function() {
	var _this = this;

	if (this.t_send) {
		this.need_update = true;
		return;
	}

	this.t_send = true;
	process.nextTick(function() {
		// was canceled?
		if (_this.t_send !== true) return;

		_this.write();
		_this.need_update = false;

		// do not send more often than 20ms:
		_this.t_send = setTimeout(function() {
			_this.t_send = null;
			if (_this.need_update) {
				_this.update();
			}
		}, 20);
	});
};
ArtNet.prototype.set = function(addr, value) {
	this.data.writeUInt8(value, 18 + addr - 1);
	this.update();
};
ArtNet.prototype.close = function() {
	this.socket.close();
	if (this.t_refresh) {
		clearTimeout(this.t_refresh);
		this.t_refresh = null;
	}
	// true means process.nextTick
	if (this.t_send && this.t_send !== true) {
		clearTimeout(this.t_send);
	}
	this.t_send = null;
};

module.exports = ArtNet;
