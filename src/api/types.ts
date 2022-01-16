export type RFC3339Date = string;

export type Model =
	| 'homeEthernet'
	| 'homeWifi'
	| 'homeEthernetFeinstaub'
	| 'homeWifiFeinstaub'
	| 'luftdaten_sds011'
	| 'luftdaten_sds011_dht11'
	| 'luftdaten_sds011_dht22'
	| 'luftdaten_sds011_bmp180'
	| 'luftdaten_sds011_bme280';

export type Exposure = 'indoor' | 'outdoor' | 'mobile' | 'unknown';

export type Columns = 'boxId' | 'boxName' | 'exposure' | 'height' | 'lat' | 'lon' | 'phenomenon' | 'sensorType' | 'unit';

export type AdvancedColumns =
	| 'boxId'
	| 'boxName'
	| 'exposure'
	| 'height'
	| 'lat'
	| 'lon'
	| 'phenomenon'
	| 'sensorType'
	| 'unit'
	| 'createdAt'
	| 'value'
	| 'sensorId';

export type Operation =
	| 'arithmeticMean'
	| 'geometricMean'
	| 'harmonicMean'
	| 'max'
	| 'median'
	| 'min'
	| 'mode'
	| 'rootMeanSquare'
	| 'standardDeviation'
	| 'sum'
	| 'variance';

export type Location = { lat: number; lng: number; height?: number } | [number, number, number?];

export type SensorTemplates =
	| 'hdc1080'
	| 'bmp280'
	| 'tsl45315'
	| 'veml6070'
	| 'sds011'
	| 'bme680'
	| 'smt50'
	| 'soundlevelmeter'
	| 'windspeed'
	| 'scd30';

export interface MQTT {
	enabled: boolean;
	url: string;
	topic: string;
	messageFormat: 'json' | 'csv';
	decodeOptions: string;
	connectionOptions: string;
}

export interface TTN {
	dev_id: string;
	app_id: string;
	profile: 'lora-serialization' | 'sensebox/home' | 'json' | 'debug' | 'cayenne-lpp';
	decodeOptions?: [];
	port: number;
}

export interface Sensor {
	title: string;
	unit: string;
	sensorType: string;
	icon?: string;
}

export interface SensorUpdate extends Sensor {
	edited: string;
	new: string;
	deleted: string;
}
