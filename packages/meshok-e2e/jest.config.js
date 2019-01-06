module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	snapshotSerializers: ["jest-serializer-html"],
	setupTestFrameworkScriptFile: "./jest.setup.js",
};
