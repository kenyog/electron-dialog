window.dialog = require('./index-for-renderer').getInstance();
if (window.dialog._preload) {
  require(window.dialog._preload);
}

