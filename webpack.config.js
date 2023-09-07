const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
   entry: './src/index.js',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'app.bundle.js',
   },
   module: {
      rules: [
         {
            test: /\.css$/,
            use: [
               MiniCSSExtractPlugin.loader,
               'css-loader'
            ]            
         },
         {
            test: /\.png$/,
            type: 'asset/inline'
         }
      ],
   },
   plugins: [
      new HtmlWebpackPlugin ({
         template: './src/index.html',
         filename: './index.html'
      }),
      new MiniCSSExtractPlugin ({
         filename: '[name].css'
      })
   ]
}