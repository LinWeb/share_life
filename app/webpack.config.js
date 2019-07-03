const CompressionPlugin = require('compression-webpack-plugin');

module.exports = (config) => {
    config.plugins.push(new CompressionPlugin({
        algorithm: 'gzip',
        threshold: 10240,
        minRatio: 0.8, // 压缩比小于等于0.8的都压缩
        compressionOptions: {
            level: 9   // 压缩级别，级别越高压缩得越小，取值1~9
        }
    }))
    return config;
};