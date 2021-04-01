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
|host|Host<br/><br/>Default: `"255.255.255.255"`|string|
|port|Port<br/><br/>Default: `6454`|number|
|refresh\_rate|Refresh Rate (in ms)<br/><br/>Default: `4000`|number|
|universe|ArtNet universe<br/>|number|
|iface|Interface to bind the Art-Net socket to<br/>|string|

**Additional Properties:** `false`<br/>
**Example**

```json
{
    "host": "255.255.255.255",
    "port": 6454,
    "refresh_rate": 4000
}
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
