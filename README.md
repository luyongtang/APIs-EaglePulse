## APIs-Eagle Pulse
The Eagle Pulse Database API is a project developed to better serve the [Eagle Pulse website](http://eaglepulse.com) by having more precision on which data to select from the backend. Now, the extended parameters from this new API-calls include location, news source type, maximum quantity of news and period of time.

The API solution is built using Node.JS with Espress JS library. The JSON format is used to input and output data from the API.

### 1. Basic Example
Retrieve all the latest news for Montreal city

##### Input to `/news` using `GET`
In this example, we only request 1 news quantity to not have a very long JSON output
```JSON
{
	"areaName": "Montreal",
	"latestNews": true,
	"allSources": true,
	"maxNewsQuantity": 1
}
```
##### Output

```JSON
{
    "status": 200,
    "err": "",
    "msg": "",
    "data": [
        {
            "title": "suscipit, est ac facilisis facilisis, magna",
            "location": "123 Blvd. Example, Montreal, QC P1P 2E2",
            "sourceName": "ABC Source",
            "lastUpdated": "2019-05-21T06:15:53.000Z",
            "latitude": 45.515339,
            "longitude": -73.5901677,
            "url": "https://www.example.com/article/561"
        }
    ]
}
```

### 2. Advance Example
Retrieve all news in Montreal published by XYZ News from 2019-05-15 06:11:23 to 2019-05-23 18:46:06
##### Input to `/news` using `GET`
```JSON
{
	"areaName": "Montreal",
	"latestNews": false,
	"newsPeriod": {
		"startTime": "2019-05-15 06:11:23",
		"endTime": "2019-05-23 18:46:06"
	},
	"allSources": false,
	"sources": [
		"XYZ News"
	],
	"maxNewsQuantity": 1
}

```
##### Output
```JSON
{
    "status": 200,
    "err": "",
    "msg": "",
    "data": [
        {
            "title": "cursus. Integer mollis. Integer tincidunt aliquam arcu. Aliquam ultrices iaculis",
            "location": "43 Example Street, Montreal, QC E1P 1E1",
            "sourceName": "XYZ News",
            "lastUpdated": "2019-05-20T23:26:21.000Z",
            "latitude": 45.515994,
            "longitude": -73.5861287,
            "url": "http://example.com/article/1934"
        }
    ]
}
```

The examples above are adapted to better understand the API calls input and ouput.
