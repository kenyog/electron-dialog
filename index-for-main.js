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
  title: 'electron-dialogify',
  show: false,
  modal: true,
};

const DEFAULT_OPTIONS_WP = {
  webgl: false,
  webaudio: false,

};

var selfInstances = new Map();


class Dialog extends BrowserWindow {

  constructor(input, options) {
    super(options);
    this.inData_ = input;
    this.outData_ = null;
    this.errData_ = null;
    selfInstances.set(this.id, this);
  }

  exit(result) { this.exitSuccess(result); }
  exitSuccess(result) {
    this.outData_ = result;
    this.close();
  }

  fail(result) { this.exitFailure(result); }
  exitFailure(error) {
    this.errData_ = error;
    this.close();
  }

  get argument() { return this.parameter; }
  get parameter() {
    return this.inData_;
  }

  get result() {
    return [this.errData_, this.outData_];
  }
}

function makeOptions(userOptions) {
  if (userOptions) {
    var wp = Object.assign({}, DEFAULT_OPTIONS_WP, userOptions.webPreferences);
    var opt  = Object.assign({}, DEFAULT_OPTIONS, userOptions);
  } else {
    var wp = Object.assign({}, DEFAULT_OPTIONS_WP);
    var opt  = Object.assign({}, DEFAULT_OPTIONS);
  }

  wp.preload = path.join(__dirname,'preload.js');
  opt.webPreferences = wp;
  return opt;
}

var eDialog = {
  showDialog: function(url, options, input) {
    return new Promise((resolve,reject) => {
      let opt = makeOptions(options);
      let dialog = new Dialog(input, opt);
      dialog.loadURL(url);
      dialog.on('ready-to-show', () => {
        dialog.show();
      });
      dialog.on('closed', () => {
        var [err, out] = dialog.result;
        if (err) {
          reject(err);
        } else {
          resolve(out);
        }
      });
    });
  },

  getInstance: function(browserWindow) {
    return selfInstances.get(browserWindow.id);
  },
};

module.exports = eDialog;

