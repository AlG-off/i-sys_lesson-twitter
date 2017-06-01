module.exports = {
  entry: {
    front: './front/index',
    back: './index',
  },

  output: {
    filename: './public/[name].bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'stage-0'],
        },
      },
      {
        test: /\.css$/,
        use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
        ],
      },
    ],
  },
};
