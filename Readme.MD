# winston-ravendb

A RavenDB transport for [winston][0].

## Usage
``` js
  var winston = require('winston');
  
  //
  // Requiring `winston-ravendb` will expose 
  // `winston.transports.RavenDB`
  //
  require('winston-ravendb').RavenDB;
  
  winston.add(winston.transports.RavenDB, options);
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

*Metadata:* Logged as a native JSON object.

## Installation

### Installing winston-ravendb

``` bash
  $ npm install winston
  $ npm install winston-ravendb
```