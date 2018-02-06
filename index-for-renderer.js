'use strict';

const { remote } = require('electron');
const eDialog = remote.require(require.resolve('./index-for-main'));

const original = eDialog.getInstance;
eDialog.getInstance = function(browserWindow) {
  if (!browserWindow) {
    browserWindow = remote.getCurrentWindow();
  }
  return original(browserWindow);
}

module.exports = eDialog;
