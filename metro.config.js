// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure TS files are supported
config.resolver.sourceExts.push('ts', 'tsx');

module.exports = config;
