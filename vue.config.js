const path = require('path')

module.exports = {
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
    config
      .module
      .rule('file')
      .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 10000,
        name: 'assets/fonts/[name].[ext]'
      })
      .end()
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "~@/assets/scss/bootstrap-overrides.sass"'
      }
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'development') {
      // mutate config for production...
    } else {
      // mutate for development...
    }
  },
  publicPath: '/'
}

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/styles/imports.styl')
      ]
    })
}
