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

module.exports["should log message"] = function(test) {
	test.expect(1);

	var save = sinon.spy();

	stubs.push(sinon.stub(ravenjs, "connect", function() {
		return {
			save: save
		};
	}));

	logger.log("info", "my message");

	test.ok(save.calledOnce);

	test.done();
};

module.exports["should log message & metadata"] = function(test) {
	test.expect(1);

	var save = sinon.spy();
	var cb = sinon.spy();

	stubs.push(sinon.stub(ravenjs, "connect", function() {
		return {
			save: save
		};
	}));

	logger.log("info", "my message", { myMetaData: "this"});

	test.ok(save.calledOnce);

	test.done();
};

module.exports["log should throw error on saving error"] = function(test) {
	test.expect(2);

	var logged = sinon.spy();
	var error = sinon.spy();

	stubs.push(sinon.stub(ravenjs, "connect", function() {
		return {
			save: function(doc, cb) {
				cb(new Error());
			}
		};
	}));

	logger.on("error", error);
	logger.on("logged", logged);

	logger.log("info", "my message", {}, error);

	test.ok(error.calledTwice);
	test.ok(!logged.called);

	test.done();
};

module.exports["should throw error on bad params 1"] = function(test) {
	test.expect(1);

	test.throws(function() {
		logger.log("info");
	}, Error);

	test.done();
};

module.exports["should throw error on bad params 2"] = function(test) {
	test.expect(1);

	test.throws(function() {
		logger.log("info", {});
	}, Error);

	test.done();
};