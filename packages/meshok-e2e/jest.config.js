module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	snapshotSerializers: ["jest-serializer-html"],
	setupFilesAfterEnv: ["./jest.setup.js"],
};
