module.exports = {
  transpileDependencies: true,
  publicPath: './',
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].scriptLoading = 'blocking';
        return args;
      });
  }
}