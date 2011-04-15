Usage
=====

	Ti.include("TiDebug.js");
	TiDebug.on = true;
	
	TiDebug.message("This is a debug message!");
	TiDebug.message(JSON.stringify(myObject));

Activation
==========

To activate the debug screen simply shake your device. If you have the device shake mapped to another event, edit TiDebug.js and change the "shake" listener to another gesture.