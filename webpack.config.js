const path = require('path')
module.exports = {

  entry: {
  main:  './src/index.js',
  clubs:  './src/index2.js'
  },
  output: {
    
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    library:'[name]'

  }
};