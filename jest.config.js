module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    detectOpenHandles: true,
    forceExit: true,
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  };
  