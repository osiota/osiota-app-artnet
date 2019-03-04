var ArtNet = require("./helper_artnet");

var a = new ArtNet({
	"host": "192.168.0.1"
});
//a.set(0, 0x22);
setTimeout(function() {
	a.set(0, 0x22);
	//a.close();
}, 1000);
