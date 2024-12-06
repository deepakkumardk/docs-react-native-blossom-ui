const path = require("path");
const webpack = require("webpack");

const nodeModules = path.join(__dirname, "..", "node_modules");

const config = function () {
  return {
    name: "custom-webpack-plugin",
    configureWebpack(config, isServer, utils) {
      const { getJSLoader } = utils;
      return {
        plugins: isServer
          ? []
          : [
              new webpack.ProvidePlugin({
                Buffer: ["buffer", "Buffer"],
                process: "process/browser",
              }),
            ],
        module: {
          rules: [
            {
              test: /\.(jpg|png|woff|woff2|eot|svg)$/,
              use: [
                {
                  loader: "file-loader",
                },
              ],
            },
            {
              test: /\.ttf$/,
              loader: "url-loader",
              include: path.resolve(
                __dirname,
                "node_modules/react-native-vector-icons"
              ),
            },
            {
              test: /\.(t|j)sx?$/,
              use: [
                getJSLoader(isServer, {
                  plugins: ["@babel/plugin-proposal-class-properties"],
                  presets: ["@babel/preset-react", "@babel/preset-env"],
                }),
              ],
              include: [
                path.resolve(
                  nodeModules,
                  "@react-native-blossom-ui/components"
                ),
                path.resolve(nodeModules, "@react-native-blossom-ui/showcase"),
                path.resolve(nodeModules, "react-native-vector-icons"),
              ],
            },
          ],
        },
        resolve: {
          alias: {
            "react-native$": "react-native-web",
            "@react-native-blossom-ui/components": path.resolve(
              nodeModules,
              "@react-native-blossom-ui/components"
            ),
            "@react-native-blossom-ui/showcase": path.resolve(
              nodeModules,
              "@react-native-blossom-ui/showcase"
            ),
            "@react-native-vector-icons": path.resolve(
              nodeModules,
              "@react-native-vector-icons"
            ),
          },
          fallback: isServer
            ? {}
            : {
                path: require.resolve("path-browserify"),
                os: require.resolve("os-browserify/browser"),
                fs: false,
                process: "process/browser",
              },
        },
      };
    },
  };
};

module.exports = config;
