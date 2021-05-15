// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/sg-parser/'
    : '',
  devServer: {
    proxy: 'https://www.steamgifts.com/'
  }
};
