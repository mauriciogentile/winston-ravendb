var util = require('util');
var raven = require('ravenjs');
var winston = require('winston');
var common = require('winston/lib/winston/common');
var uuid = require('node-uuid');
var __ = require('lodash');

var RavenDB = exports.RavenDB = function (options) {
	this.settings = options || {};
	this.name = "ravendb";
	checkAndFixOptions(this.settings);
	configureRaven(this.settings);
};

util.inherits(RavenDB, winston.Transport);

winston.transports.RavenDB = RavenDB;

RavenDB.prototype.name = 'ravendb';

RavenDB.prototype.log = function (level, msg, meta, cb) {
	if (!__(level).isString()) throw new Error("Expected a valid 'level' string.");
	if (!__(msg).isString()) throw new Error("Expected a valid 'msg' string.");

	var self = this;
	
	var entry = {
		id: this.settings.entityName + "/" + uuid.v4(),
		timestamp: new Date,
		level: level,
		message: msg,
		meta: meta,
		"@metadata": {
	  		"Raven-Entity-Name": self.settings.entityName
		}
	};

	raven.connect().save(entry, function(err) {
		if(err) {
			self.emit('error', err);
			return handleCallback(cb, err);
		}
		self.emit('logged');
		return handleCallback(cb, undefined, true);
	});
};

RavenDB.prototype.query = function (options, cb) {
	if (!__(options).isString()) throw new Error("Expected a valid 'options' string.");
	if (!__(cb).isFunction()) throw new Error("Expected a valid 'cb' function.");

	var self = this;
	var indexName = self.settings.entityName + "ByTimestamp";
	ensureIndexExists(indexName, function(err) {
		if(err) {
			return handleCallback(cb, err);
		}
		raven.connect()
		.query(indexName)
		.lucene(buildLuceneQuery(options))
		.results(function(err, data) {
    		if(err) {
    			self.emit('error', err);
    			return handleCallback(cb, err);
    		}
    		return handleCallback(cb, undefined, data.Results);
  		});
	});
};

RavenDB.prototype.luceneQuery = function (indexName, luceneQuery, cb) {
	if (!__(indexName).isString()) throw new Error("Expected a valid 'indexName' string.");
	if (!__(luceneQuery).isString()) throw new Error("Expected a valid 'luceneQuery' string.");
	if (!__(cb).isFunction()) throw new Error("Expected a valid 'cb' function.");

	var self = this;
	return raven.connect()
		.query(indexName)
		.lucene(query)
		.results(function(err, data) {
    		if(err) {
    			self.emit('error', err);
    			return handleCallback(cb, err);
    		}
    		return handleCallback(cb, undefined, data);
  		});
};

RavenDB.prototype.fluentQuery = function (indexName) {
	if (!__(indexName).isString()) throw new Error("Expected a valid 'indexName' string.");
	
	return raven.connect().query(indexName);
};

var ensureIndexExists = function(indexName, callback) {
	raven.connect()
	.index(indexName)
	.map("from log in docs.Log\r\nselect new { log.timestamp, log.level }")
	.create(callback);
};

var buildLuceneQuery = function(filters) {
	var err = new Error("Filter must contain 'from', 'to' and/or 'level'")
	if(!filters || (!filters.from && !filters.to && !filters.level)) {
		throw err;
	}
	if(!filters.from) {
		filters.from = "NULL";
	}
	if(!filters.to) {
		filters.to = "NULL";
	}
	if(!filters.level) {
		filters.level = "*";
	}
	return "timestamp:[" + filters.from + " TO " + filters.to + "] AND level:" + filters.level;
};

var checkAndFixOptions = function(settings) {
	settings.entityName = settings.entityName || 'Log';
	settings.level = settings.level || 'info';
};

var configureRaven = function(settings) {
	raven.useOptimisticConcurrency(true);
	if(settings.connectionString) {
		raven.connectionString(settings.connectionString);
	}
	if(settings.serverUrl) {
		raven.host(settings.serverUrl);
	}
	if(settings.database) {
		raven.database(settings.database);
	}
	if(settings.apiKey) {
		raven.apiKey(settings.apiKey);
	}
	if(settings.username) {
		raven.username(settings.username);
		raven.password(settings.password);
	}
	if(settings.proxyUrl) {
		raven.proxy(settings.proxyUrl);
	}
};

var handleCallback = function(callback, err, data) {
	if(callback && __(callback).isFunction) {
		if(err) {
			return callback(err, undefined);
		}
		return callback(undefined, data);
	}
};