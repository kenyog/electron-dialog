const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const eDialog = require('electron-dialogbox');

app.on('ready', async function() {
  try {
    await eDialog.showDialog(
      'file:///'+__dirname+'/index.html',
      {width: 400, height: 300},
      "simple dialog diaplaying test."
    );
  } catch(e) {
    console.log('dialog emit error: ', e);
  }
  app.quit();
})


