const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const eDialog = require('electron-dialogbox');

app.on('ready', async function() {
  try {
    let result = await eDialog.showDialog(
      'file:///'+__dirname+'/index.html',
      {width: 400, height: 300, title: 'dialogbox test e01'},
      "simple dialog diaplaying test."
    );
    console.log('result = ', result);
  } catch(e) {
    console.log('dialog emit error: ', e);
  }
  app.quit();
})


