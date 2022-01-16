export type TRFC3339Date = string;

export type TModel =
	| 'homeEthernet'
	| 'homeWifi'
	| 'homeEthernetFeinstaub'
	| 'homeWifiFeinstaub'
	| 'luftdaten_sds011'
	| 'luftdaten_sds011_dht11'
	| 'luftdaten_sds011_dht22'
	| 'luftdaten_sds011_bmp180'
	| 'luftdaten_sds011_bme280';

export type TExposure = 'indoor' | 'outdoor' | 'mobile' | 'unknown';

export type TColumns = 'boxId' | 'boxName' | 'exposure' | 'height' | 'lat' | 'lon' | 'phenomenon' | 'sensorType' | 'unit';

export type TAdvancedColumns =
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

export type TOperation =
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

export type TLocation = { lat: number; lng: number; height?: number } | [number, number, number?];

export type TSensorTemplates =
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

export interface IMQTT {
	enabled: boolean;
	url: string;
	topic: string;
	messageFormat: 'json' | 'csv';
	decodeOptions: string;
	connectionOptions: string;
}

export interface ITTN {
	dev_id: string;
	app_id: string;
	profile: 'lora-serialization' | 'sensebox/home' | 'json' | 'debug' | 'cayenne-lpp';
	decodeOptions?: [];
	port: number;
}

export interface ISensor {
	title: string;
	unit: string;
	sensorType: string;
	icon?: string;
}

export interface ISensorUpdate extends ISensor {
	edited: string;
	new: string;
	deleted: string;
}
