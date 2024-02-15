const path = require('path');

module.exports = {
  entry: './src/index.js', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output bundle file name
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Match both .js and .jsx files
        exclude: /node_modules/, // Exclude node_modules directory
        use: {
          loader: 'babel-loader', // Use babel-loader for .js and .jsx files
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Presets used by babel-loader
          },
        },
      },
      {
        test: /\.scss$/, // Match .scss files
        use: [
          'style-loader', // Inject styles into DOM
          'css-loader',   // Resolve CSS imports
          'sass-loader'   // Compile Sass to CSS
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // File extensions to resolve
  },
};
