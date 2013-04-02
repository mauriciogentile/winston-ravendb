var ravenjs = require("ravenjs");
var winston = require("winston");
var sinon = require("sinon");
var assert = require("assert");
var RavenDB = require("../lib/winston-ravendb").RavenDB;

var logger = new (RavenDB)({ serverUrl: "http://localhost:8888", database: "Hola" });

var stubs = [];

module.exports.setUp = function(cb) {
	cb();
};

module.exports.tearDown = function(cb) {
	for(var i = 0; i < stubs.length; i++) {
		stubs[i].restore();
	}
	cb();
};

module.exports["should throw error on missing parameters"] = function(test) {
	test.expect(5);

	test.throws(function() {
		logger.luceneQuery();
	}, Error);

	test.throws(function() {
		logger.luceneQuery("");
	}, Error);

	test.throws(function() {
		logger.luceneQuery(null);
	}, Error);

	test.throws(function() {
		logger.luceneQuery("indexName","query");
	}, Error);

	test.throws(function() {
		logger.luceneQuery("indexName","query", {});
	}, Error);

	test.done();
};