module.exports = {
  presets: ['module:@react-native/babel-preset'],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
    development: {
      plugins: ['transform-remove-console'],
    },
  },
};
