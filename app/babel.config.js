module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.ts', '.tsx'],
        alias: {
          '@app': ['./src/app'],
          '@design-system': ['./src/design-system'],
          '@features': ['./src/features'],
          '@models': ['./src/models'],
          '@screens': ['./src/screens'],
        },
      },
    ],
  ],
}
