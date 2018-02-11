# API

> Create and control dialogbox.

Process: Main, Renderer


## Methods

The eDialog object has following methods:

### `eDialog.showDialog(url, [options], [inputData])`

Creates and shows dialog box which has contents you specify by url parameter.
And the method returns Promise object which is resolved when the dialog is closed.

* `url` String - The url which you want to show in dialog box.
* `options` Object (optional) - This parameter is passed to constructor of BrowserWindow.
* `inputData` Object (optional) - input parameter for the dialog box. it's treated in context of dialog box.


### `eDialog.getInstance(browserWindow)`

Returns instance of dialog box related with instance of BrowserWindow.
If this module is imported from Renderer process, the parameter browserWindow can be omitted. in that case, the method returns current dialog box instance.


## Class: Dialog

> controls dialog boxes.

Process: Renderer

### Instance Properties

#### `dialog.argument`

It is the input data from creator of this dialog box using `inputData` parameter of `eDialog.showDialog()` method.


### Instance Methods


#### `dialog.exitSuccess({result})`

Is equivalent to exit();

#### `dialog.exit({result})`

Closes this dialog box successfuly.

* `result` Any - The result of this dialog box. It will be received by the creator of this dialog box through Promise.


#### `dialog.exitFailure({result})`

Is equivalent to fail();

#### `dialog.fail(error)`

Closes this dialog box and emits exception to creator of the dialog box.

* `error` Any - The error which will be emitted from the dialog box.



