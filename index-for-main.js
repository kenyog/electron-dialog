'use strict';

// Node.js modules.
const path = require('path');

// Electron modules.
const {BrowserWindow} = require('electron');


// constant definition.
const DEFAULT_OPTIONS = {
  resizable: false,
  minimizable: false,
  maximizable: false,
  alwaysOnTop: true,
  center: true,
  title: 'electron-dialogify',
  show: false,
  modal: true,
};

const DEFAULT_OPTIONS_WP = {
  webgl: false,
  webaudio: false,
};

const DEFAULT_OPTIONS_DIALOG = {
  menu: null,
  javascript: null,
};

var selfInstances = new Map();


class Dialog {

  constructor(url, options, input) {
    this.args = input;
    this.isSuccess = true;
    this.result = null;

    this.window = new BrowserWindow(options);
    this.window.setMenu(options.dialog.menu);
    this.window.loadURL(url);
    this.window.on('closed', () => {
      selfInstances.delete(this.window);
      this.window = null;
    });
    selfInstances.set(this.window, this);
  }

  exit(result) { this.exitSuccess(result); }
  exitSuccess(result) {
    this.isSuccess = true;
    this.result = result;
    this.window.close();
  }

  fail(result) { this.exitFailure(result); }
  exitFailure(result) {
    this.isSuccess = false;
    this.result = result;
    this.window.close();
  }

  get browserWindow() { return this.window; }

  get resultPromise() {
    return new Promise((resolve, reject) => {
      this.window.on('closed', () => {
        if (this.isSuccess) {
          resolve(this.result);
        } else {
          reject(this.result);
        }
      });
    });
  }

  get argument() { return this.parameter; }
  get parameter() {
    return this.args;
  }
}

function makeOptions(userOptions) {
  if (userOptions) {
    var dopt = Object.assign({}, DEFAULT_OPTIONS_DIALOG, userOptions.dialog);
    var wp = Object.assign({}, DEFAULT_OPTIONS_WP, userOptions.webPreferences);
    var opt  = Object.assign({}, DEFAULT_OPTIONS, userOptions);
  } else {
    var dopt = Object.assign({}, DEFAULT_OPTIONS_DIALOG);
    var wp = Object.assign({}, DEFAULT_OPTIONS_WP);
    var opt  = Object.assign({}, DEFAULT_OPTIONS);
  }

  wp.preload = path.join(__dirname,'preload.js');
  opt.webPreferences = wp;
  opt.dialog = dopt;
  return opt;
}

var eDialog = {
  showDialog: function(url, options, input) {
    let opt = makeOptions(options);
    let dialog = new Dialog(url, opt, input);
    dialog.browserWindow.on('ready-to-show', () => {
      dialog.browserWindow.show();
    });

    return dialog.resultPromise;
  },

  getInstance: function(browserWindow) {
    return selfInstances.get(browserWindow);
  },
};

module.exports = eDialog;

