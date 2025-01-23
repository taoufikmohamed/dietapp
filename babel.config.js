module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', '@babel/preset-react'],
    env: {
      production: {
        plugins: ['react-native-paper/babel']
      }
    }
  };
};