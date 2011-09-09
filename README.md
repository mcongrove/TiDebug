Instantiation
=============

	// Include the TiDebug class
	Ti.include("TiDebug.js");
	
	// Enable the TiDebug class, with configuration options (all required)
	TiDebug.enable({
		appName: "TiDebug",
		appVersion: "1.0.0",
		email: "mattcongrove@gmail.com"
	});

Opening TiDebug Menu
====================

	// Use `toggle` to alternate display of TiDebug menu
	Ti.Gesture.addEventListener("shake", TiDebug.toggle);
	
	// Use `show` and `hide` to open or close TiDebug menu
	myButton.addEventListener("click", TiDebug.show);
	
	// You can even make a Tab for your TabGroup, making it available at all times
	tab = Ti.UI.createTab({
		window: TiDebug.win,
		title: "Debug"
	});

Usage
=====

	// Send a message to the TiDebug log
	TiDebug.log("This is a debug message!");