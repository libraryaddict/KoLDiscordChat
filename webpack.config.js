/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require("path");
const { merge } = require("webpack-merge");

const sharedConfig = {
  mode: "production",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  externals: {
    kolmafia: "commonjs kolmafia",
  },
  optimization: {
    minimize: false,
  },
};

class ApiOnly {
  apply(compiler) {
    compiler.hooks.emit.tapAsync("ApiOnly", (compilation, callback) => {
      for (const assetName in compilation.assets) {
        // Example: Remove assets that are declaration files and are not in /api/
        if (!assetName.includes("/api/") && assetName.endsWith(".d.ts")) {
          delete compilation.assets[assetName];
        }
      }

      callback();
    });
  }
}

const TypescriptDeclarationPlugin = require("typescript-declaration-webpack-plugin");
const RemovePlugin = require("remove-files-webpack-plugin");

// Create the NPM library
const createNpm = merge(
  {
    name: "api",
    entry: "./src/api/DiscordMessage.ts",
    output: {
      filename: "index.js",
      path: path.join(__dirname, "./dist"),
      libraryTarget: "commonjs",
    },
    module: {
      rules: [
        {
          // Include ts, tsx, js, and jsx files.
          test: /\.ts$/,
          // exclude: /node_modules/,
          loader: "ts-loader",
        },
        {
          test: /\.js/,
          type: "asset/inline",
        },
      ],
    },
    plugins: [
      // Plugin to stop the next plugin from using declaration files outside of api
      new ApiOnly(),
      new TypescriptDeclarationPlugin({ removeComments: false }),
      new RemovePlugin({
        after: {
          include: ["./dist/ignored.js"],
        },
      }),
    ],
  },
  sharedConfig
);

// Create the mafia script
const createScript = merge(
  {
    name: "script",
    entry: "./src/DiscordChat.ts",
    output: {
      filename: "discord.js",
      path: path.join(__dirname, "./dist/scripts"),
      libraryTarget: "commonjs",
    },
    module: {
      rules: [
        {
          // Include ts, tsx, js, and jsx files.
          test: /\.ts$/,
          // exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.js/,
          type: "asset/inline",
        },
      ],
    },
  },
  sharedConfig
);

module.exports = [createNpm, createScript];
