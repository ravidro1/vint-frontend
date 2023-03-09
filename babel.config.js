module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["nativewind/babel",
      'react-native-reanimated/plugin',
    [
    "module:react-native-dotenv",
      {
        envName: 'REACT_APP_ENV',
        moduleName: '@env',
        path: '.env',
      }
    ],
    ]
  }
};
