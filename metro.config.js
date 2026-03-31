const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

config.resolver = {
  ...config.resolver,
  alias: {
    ...config.resolver.alias,
    "react-dom": require.resolve("react-native"),
    "react-dom/server": require.resolve("react-native"),
  },
  extraNodeModules: {
    ...config.resolver.extraNodeModules,
    "react-dom": require.resolve("react-native"),
    "react-dom/server": require.resolve("react-native"),
  },
};

module.exports = withNativeWind(config, {
  input: "./src/styles/global.css",
});
