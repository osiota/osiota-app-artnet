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

|Name|Type|Description|Required|
|----|----|-----------|--------|
|**host**|`string`|Default: `"255.255.255.255"`<br/>|no|
|**port**|`number`|Default: `6454`<br/>|no|
|**refresh\_rate**|`number`|in ms<br/>Default: `4000`<br/>|no|
|**universe**<br/>(ArtNet universe)|`number`|Default: `0`<br/>|no|
|**iface**<br/>(Interface)|`string`|Interface to bind the Art-Net socket to<br/>|no|
|[**map**](#map)<br/>(DMX channels)|`object[]`||no|

**Additional Properties:** not allowed<br/>
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

|Name|Type|Description|Required|
|----|----|-----------|--------|
|**channel**|`number`|Minimum: `1`<br/>Maximum: `512`<br/>|yes|
|**node**<br/>(Node Name)|`string`||no|
|**default\_value**|`number`|Minimum: `0`<br/>Maximum: `255`<br/>|no|

**Item Additional Properties:** not allowed<br/>
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
