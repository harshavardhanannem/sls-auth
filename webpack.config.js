const slsw = require("serverless-webpack");

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.(node)$/i,
        use: [
          {
            loader: 'node-loader',
          },
        ],
      },
    ],
  },
};
