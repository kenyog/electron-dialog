if (require('is-electron-renderer')) {
  module.exports = require('./index-for-renderer');
} else {
  module.exports = require('./index-for-main');
}
