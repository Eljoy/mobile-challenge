const nodeModulesToIgnoreTransform = []

module.exports = {
  clearMocks: true,

  globals: {
    window: {},
  },

  preset: 'react-native',

  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],

  moduleNameMapper: {
    '^@api(.*)$': '<rootDir>/src/api$1',
    '^@common(.*)$': '<rootDir>/src/common$1',
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
    'node_modules/(?!(' + nodeModulesToIgnoreTransform.join('|') + '))',
  ],
}
