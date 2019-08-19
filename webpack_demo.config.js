const path = require('path')

module.exports = {
  entry: {
    index: path.join(__dirname, 'demo/src/index.js')
  },
  output: {
    path: path.join(__dirname, 'public/build'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.md$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'html-loader'
          },
          {
            loader: 'markdown-loader'
          }
        ]
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          {
            loader: 'sass-loader'
          }
        ],

      }
    ]
  },
  devtool: 'inline-source-map',
  mode: 'development',
  watch: process.env.WATCH === 'true'
}
