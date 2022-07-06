/* config-overrides.js */
const webpack = require('webpack');
module.exports = function override(config, env) {
    config.resolve.fallback = {
        util: require.resolve('util/'),
        url: require.resolve('url'),
        assert: require.resolve('assert'),
        buffer: require.resolve('buffer'),
        path: require.resolve('path-browserify'),
        os: require.resolve("os-browserify/browser"),
        fs: false,
        module: false
    };
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser.js',
            Buffer: ['buffer', 'Buffer'],
        }),
    );

    return config;
}