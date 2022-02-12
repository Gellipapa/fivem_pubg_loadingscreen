const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin').default
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
entry: './src/index.js',
  // Where files should be sent once they are bundled
 output: {
   path: path.join(__dirname, '/dist'),
   filename: 'bundle.js'
 },
  // webpack 5 comes with devServer which loads in development mode
  devServer: {
    compress: true,
    historyApiFallback: true,
    https: false,
    open: true,
    hot: true,
    port: 9002,
    proxy: {
      '/api': 'http://localhost:9000'
    },
    devMiddleware: {
      writeToDisk: true,
    },
  },
  // Rules of how webpack will take our files, complie & bundle them for the browser 
 module: {
   rules: [
     {
       test: /\.(js|jsx)$/,
       exclude: /nodeModules/,
       use: {
         loader: 'babel-loader'
       }
     },
     {
       test: /\.(s[ac]|c)ss$/i,
       use: [MiniCssExtractPlugin.loader,'css-loader','sass-loader']
     }
   ]
 },
 //dev modehoz kell ha látni szeretnénk a source code-ot
 //devtool:'source-map',
 devtool:'eval-source-map',
 optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
        terserOptions: {
            format: {
                comments: true,
            },
        },
        extractComments: false,
    })],
},
 plugins: [new HtmlWebpackPlugin({ template: './src/index.html' }),new MiniCssExtractPlugin()],
}