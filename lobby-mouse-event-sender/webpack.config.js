const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'index.ts'),
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'lobby-mouse-event-sender.js',
    library: 'LobbyMouseEventSender',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    libraryExport: 'default'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(__dirname, 'tsconfig.json')
          }
        },
        exclude: /node_modules/
      }
    ]
  }
};
