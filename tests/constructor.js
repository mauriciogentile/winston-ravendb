var sinon = require("sinon");
var ravenjs = require("ravenjs");
var winston = require("winston");
var RavenDB = require("../lib/winston-ravendb").RavenDB

/*
module.exports["should throw error when no parameters"] = function(test) {
	var error = sinon.spy();
	var logger = new (RavenDB)();
	logger.on("error", error);
	logger.log("info", "my message");

	test.expect(1);
	test.ok(error.calledOnce);
	test.done();
};

module.exports["should throw error when no connstring is empty"] = function(test) {
	var error = sinon.spy();
	var logger = new (RavenDB)({});
	logger.on("error", error);
	logger.log("info", "my message");

	test.expect(1);
	test.ok(error.calledOnce);
	test.done();
};

module.exports["should throw error when no username or pass"] = function(test) {
	var options = {
		serverUrl: "http://local:80",
		database: "db",
		username: "chucknorris"
	};

	var error = sinon.spy();
	var logger = new (RavenDB)(options);
	logger.on("error", error);
	logger.log("info", "my message");

	test.expect(1);
	test.ok(error.calledOnce);
	test.done();
};

module.exports["should throw error when no database"] = function(test) {
	test.expect(1);
	var options = {
		serverUrl: "http://local:80",
		username: "easy",
		password: "65"
	};

	test.throws(function() {
		logger.log("info", "my message");
	}, Error, "Invalid parameters checked");
	test.done();
};

module.exports["should throw error when connstring is bad formed"] = function(test) {
	test.expect(1);
	var options = {
		connectionString: "some"
	};
	
	var error = sinon.spy();

	logger.on("error", error);
	logger.log("info", "my message");

	test.ok(error.calledOnce);
	test.done();
};

module.exports["should not throw error when connstring is well formed"] = function(test) {
	var options = {
		connectionString: "Url=http://"
	};

	test.expect(1);
	RavenDB(options);
	test.ok(true);
	test.done();
};

module.exports["should throw error when connstring is empty"] = function(test) {
	var options = {
		connectionString: ""
	};

	test.expect(1);
	test.throws(function() {
		logger.log("info", "my message");
	}, Error, "Invalid parameters checked");
	test.done();
};
*/