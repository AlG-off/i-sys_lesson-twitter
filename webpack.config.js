const merge = require('webpack-merge');

/* module.exports = {
  entry: {
    front: './front/index',
    back: './index'
  },

  output: {
    filename: './public/[name].bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'stage-2']
        }
      }
    ]
  },
  node: {
    net: 'empty',
    fs: 'empty'
  },
  target: 'node'
};*/

const baseConf = {
    server: {
        target: 'node',
        entry: './index',
        output: {
            filename: './public/back.bundle.js'
        },
        node: {
            net: 'empty',
            fs: 'empty'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'stage-2']
                    }
                }
            ]
        }
    },
    client: {
        entry: './front/index',
        output: {
            filename: './public/front.bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'stage-2']
                    }
                }
            ]
        }
    }
};

module.exports = merge.multiple(baseConf);
