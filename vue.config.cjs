module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/my-asfd/'
  : '/',
    devServer: {
      disableHostCheck: true
    }
  }