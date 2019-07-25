module.exports = {
  configureWebpack:{
     output:{
            filename:'js/[name].bundle.js',
        chunkFilename: 'js/[name].bundle.js'
       }
  },  
  chainWebpack: config => {
    config.plugin('html')
          .tap(args => {
             args[0].template = './src/index.html'
             return args
           })
    config.module
          .rule('images')
          .use('url-loader')
          .loader('url-loader')
          .tap(options=>{
             options.limit=4096;
             options.fallback= {loader: 'file-loader',options: { name: 'images/[name].[hash:8].[ext]'}};
             return options;
          })
 
  },
  outputDir:'dist',
  publicPath:'./',
  runtimeCompiler:true
}