# electron-dialogbox

The module for creating simple customizable HTML dialog box for Electron base application.

## Getting Started

### Prerequisites

This module assumes that your project using Electron.

### Installing

You can install this module following command.

```
npm intall electron-dialogbox --save-dev
```

### Howto use

This is simple example for using this module from Electron's Main process.

```
const { app } = require('electron')
const eDialog = require('electron-dialogbox');

app.on('ready', async function() {
    let result = await eDialog.showDialog(
      'file:///'+__dirname+'/index.html', {width: 400, height: 300},
      'simple dialog diaplaying test.' );
    if (result==='OK') {
      // some procedures for 'OK' button clicked.
    } esle {
      // some procedures for 'CANCEL' button clicked.
    }
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

