module.exports = {
  context: __dirname,
  
  entry: "./slackc.jsx",
  
  output: {
    path: "",
    filename: "bundle.js"
  },
  
  devserver: {
    colors: true,
    inline: true,
    progress: true
  },
  
  devtool: 'source-map',
  
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-2', 'react']
        }
      },
      
      {
        test: /\.css$/,
        loaders: ['style', 'css?sourceMap']
      },
      
      {
        test: /\.scss$/,
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
      }, 
      
      {
        test: /\.svg$/,
        loader: 'file',
        include: "./svg"
      },
      
      { 
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' 
      }
    ]
  }
};
