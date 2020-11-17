const path = require("path");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {

  mode : "development",

  entry : "./src/main.jsx",

  output : {
    path : path.resolve(__dirname, "dist"),
    filename : "main.js"
  },

  devServer : {
    contentBase : path.resolve(__dirname, "dist"),
    port : 8081
  },

  resolve : {
    extensions : [".js", ".jsx"]
  },

  module : {
    rules : [{
      test : /\.(js|jsx)$/,
      loader : "babel-loader",
      options : {
        presets : ["@babel/preset-react"]
      }
    }]
  },

  plugins : [
    new ModuleFederationPlugin({
      name : "app2",
      library : {
        type : "var",
        name : "app2"
      },
      filename : "remoteEntry.js",
      exposes : {
        "./HelloWorld" : "./src/HelloWorld"
      }
    })
  ],

  optimization : {
    minimize : false
  }

};
