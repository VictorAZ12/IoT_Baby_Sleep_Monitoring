# API Document
## Index

* The index page will display a welcome message and provide a button that when clicked on, redirects the user to the dashboard.

### URL


* http://127.0.0.1:5000/

* http://127.0.0.1:5000/index

### HTTP Request Type

* GET

### Request Parameters

* No request parameters. 

## Dashboard

* The dashboard will display, for each data field (sound, movement, humidity and temperature), the most recent measurement and the last hour of data. 

### URL

* http://127.0.0.1:5000/dashboard

### HTTP Request Type

* GET

### Request Parameters

* data = [record1, record2, ...] = [{"time": `value`, "sound": `value`, "movement": `value`, "humidity": `value`, "temperature": `value`}]

* a list of records, where each record is a dictionary mapping fields to values.

* e.g. if the period between data points is 5 seconds, then there will be 3600 records in the list.
