const { alias } = require("react-app-rewire-alias");

module.exports = {
  webpack: (config, env) => {
    alias({
      "@": "./src",
    })(config);

    return config;
  },
  jest: (config) => {
    config.moduleNameMapper = {
      "^@/(.*)$": "<rootDir>/src/$1",
      "^.+\\.(css|styl|less|sass|scss|stylus|png|jpg|svg|ttf|woff|woff2)$":
        "identity-obj-proxy",
    };

    return config;
  },
};
