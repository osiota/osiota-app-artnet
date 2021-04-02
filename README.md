<!--
Auto generated documentation:
  * Adapt schema.json and
  * Run npm run doc

Please edit schema.json or
	https://github.com/simonwalz/osiota-dev/blob/master/partials/main.md
-->
<a name="root"></a>
# osiota application artnet

*Osiota* is a software platform capable of running *distributed IoT applications* written in JavaScript to enable any kind of IoT tasks. See [osiota](https://github.com/osiota/osiota).

## Configuration: artnet


This application allows controlling lights over the Art-Net protocol.

**Properties**

|Name|Description|Type|
|----|-----------|----|
|`host` (Host)|Default: `"255.255.255.255"`<br/>|string|
|`port` (Port)|Default: `6454`<br/>|number|
|`refresh_rate` (Refresh Rate (in ms))|Default: `4000`<br/>|number|
|`universe` (ArtNet universe)||number|
|`iface` (Interface)|Interface to bind the Art-Net socket to<br/>|string|
|[`map`](#map) (DMX channels)||object\[\]|

**Additional Properties:** `false`<br/>
**Example**

```json
{
    "host": "192.0.2.42",
    "port": 6454,
    "refresh_rate": 4000,
    "universe": 0,
    "iface": "eth0",
    "map": [
        {
            "channel": 1,
            "node": "/my-artnet-channel",
            "default_value": 63
        }
    ]
}
```

<a name="map"></a>
### map\[\]: DMX channels

**Items: DMX channel**

**Item Properties**

|Name|Description|Type|
|----|-----------|----|
|`channel` (Channel)|Minimum: `1`<br/>Maximum: `512`<br/>|number|
|`node` (Node Name)||string|
|`default_value` (Default Value)|Minimum: `0`<br/>Maximum: `255`<br/>|number|

**Item Additional Properties:** `false`<br/>
**Example**

```json
[
    {
        "channel": 1,
        "node": "/my-artnet-channel",
        "default_value": 63
    }
]
```


## How to setup

Add a configuration object for this application, see [osiota configuration](https://github.com/osiota/osiota/blob/master/doc/configuration.md):

```json
{
    "name": "artnet",
    "config": CONFIG
}
```

## License

Osiota and this application are released under the MIT license.

Please note that this project is released with a [Contributor Code of Conduct](https://github.com/osiota/osiota/blob/master/CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.
