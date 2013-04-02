# winston-ravendb

A RavenDB transport for [winston][0].

## Usage
``` js
  var winston = require('winston');
  
  // Requiring `winston-ravendb` will expose 
  // `winston.transports.RavenDB`

  require('winston-ravendb').RavenDB;
  
  winston.add(winston.transports.RavenDB, options);
```

###Queries

#### Filter by level

``` js
	logger.query({level: "error"}, function(err, results) {
		if(err) {
			//error handling
		}
		//do something
	});
```

#### Filter by dates

``` js
	logger.query({from: "2013-01-01", to: 2013-12-31}, function(err, results) {
		if(err) {
			//error handling
		}
		//do something
	});
```

#### Filter using lucene

``` js
	logger.luceneQuery("myQuickIndex", "timestamp:[2013-01-01 TO 2013-04-02] AND level:NULL", function(err, results) {
		if(err) {
			//error handling
		}
		//do something
	});
```

#### Filter using fluent api

``` js
	logger.query("myQuickIndex").where("level").is("error").results(function(err, results) {
		if(err) {
			//error handling
		}
		//do something
	});
```

The RavenDB transport takes the following options:

* __level:__ Level of messages that this transport should log, defaults to 'info'.
* __silent:__ Boolean flag indicating whether to suppress output, defaults to false.

* __connectionString:__ The connection string for connecting to RavenDB.*
* __database:__ The name of the database you want to log to.*
* __serverUrl:__ The url where RavenDB is running (required if no connectionString supplied).*
* __username:__ The username for conencting to RavenDB (required if no connectionString supplied and depending on RavenDB authentication).*
* __password:__ The password for conencting to RavenDB (required if no connectionString supplied and depending on RavenDB authentication).*
* __apiKey:__  The apiKey for conencting to RavenDB (required if no connectionString supplied and depending on RavenDB authentication).*
* __proxyUrl:__ Proxy url if needed.*

## Installation

### Installing winston-ravendb

``` bash
  $ npm install winston
  $ npm install winston-ravendb
```