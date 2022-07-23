const nodeModulesToIgnoreTransform = [];

module.exports = {
  clearMocks: true,

  globals: {
    window: {},
  },

  preset: 'react-native',

  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    './jest.setup.js',
  ],

  moduleNameMapper: {
    '^@app(.*)$': '<rootDir>/src/app$1',
    '^@api(.*)$': '<rootDir>/src/api$1',
    '^@common(.*)$': '<rootDir>/src/common$1',
    '^@models(.*)$': '<rootDir>/src/models$1',
  },

  moduleDirectories: ['node_modules'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node', 'd.ts'],

  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },

  testEnvironment: 'node',

  testMatch: ['**/*.test.ts?(x)'],

  testPathIgnorePatterns: ['/node_modules/'],

  transformIgnorePatterns: [
    `node_modules/(?!(${nodeModulesToIgnoreTransform.join('|')}))`,
  ],
};
