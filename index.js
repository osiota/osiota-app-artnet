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

	var map = node.map(app_config, null, true, null,
			function(n, metadata, c) {
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
			nn.rpc_set(function() {}, default_value);
		}
	});

	return [map, node, artnet];
};

