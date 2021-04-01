var ArtNet = require('./helper_artnet');

exports.init = function(node, app_config, main, host_info) {
	var artnet = new ArtNet(app_config);

	node.rpc_dmx = function(reply, channel, value) {
		if (value === null)
			value = 0;
		if (typeof value !== "number")
			value *= 1;

		artnet.set(channel, value);

		reply(null, "ok");
	};
	node.dmx = function(channel, value) {
		if (value === null)
			value = 0;
		if (typeof value !== "number")
			value *= 1;

		artnet.set(channel, value);
	};

	node.announce({
		"type": "artnet.rpc"
	});

	// map block (see artnet)
	var map = node.map(app_config, null, true, function(c) {
		return c.channel;
	}, function(n, metadata, c) {
		let channel = c.channel;
		let default_value = c.default_value;
		n.rpc_set = function(reply, value, time) {
			if (value === null)
				value = default_value;
			if (typeof value !== "number")
				value *= 1;

			artnet.set(channel, value);
			this.publish(undefined, value, time);

			reply(null, "ok");
		};
		n.announce(metadata);
		if (default_value !== null) {
			n.rpc_set(function() {}, default_value);
		}
	});
	// end map block

	return [map, node, artnet];
};

