const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require('./package.json').dependencies;
const remoteUrls = require('./remote-urls');

module.exports = {
  entry: {
    root_mf: "./src/index.js",
  },
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "[name].bundle.js",
    clean: true,
    publicPath: "/root_application_mf/", //due to github pages otherwise "/"
  },
  target: "web",
  devServer: {
    server: 'http',
    port: "5000",
    static: {
      directory: path.join(__dirname, "src"),
    },
    historyApiFallback: true,
    hot: true,
    liveReload: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'rootMFE',
      filename: 'remoteEntry.js',
      remotes: {
        Account: `accountMFE@${remoteUrls.accountRemoteLoc}/remoteEntry.js`,
        Sharedlib: `sharedlibMFE@${remoteUrls.sharedlibRemoteLoc}/remoteEntry.js`,
        People: `peopleMFE@${remoteUrls.peopleRemoteLoc}/remoteEntry.js`,
        Messenger: `messengerMFE@${remoteUrls.messengerRemoteLoc}/remoteEntry.js`,
        Post: `postMFE@${remoteUrls.postRemoteLoc}/remoteEntry.js`
      },
      exposes: {},
      shared: {
         ...deps,
        'react': { singleton: true, requiredVersion: deps['react']},
        'react-dom': { singleton: true, requiredVersion: deps['react-dom']}
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/**/*.png",
          to:  "assets/favicon/[name][ext]"
        },
      ],
    }),
    new Dotenv({
      systemvars: true
    }),
  ],
};
