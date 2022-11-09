const {join} = require('path');
const { homedir } = require('os');

const userHomeDir = homedir();
const cacheDirectory = join(userHomeDir, '.cache', 'puppeteer');
console.log('cacheDirectory', cacheDirectory);

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer.
  cacheDirectory: cacheDirectory,
};