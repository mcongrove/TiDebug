var TiDebug = {
	message: "",
	open: false,
	on: false,
	init: function() {
		TiDebug.window	= Ti.UI.createWindow({ titleid: "Debug", layout: "vertical", backgroundColor: "#000" });
		TiDebug.view		= Ti.UI.createScrollView({ top: 0, width: 320, height: 460, contentHeight: 5000 });
		TiDebug.label		= Ti.UI.createLabel({ text: TiDebug.message, height: "auto", top: 20, left: 20, width: 300, color: "#00FF00", font: { size: 11 }});
		
		TiDebug.view.add(TiDebug.label);
		TiDebug.window.add(TiDebug.view);
		
		Ti.Gesture.addEventListener("shake", function(_event) {
			if(TiDebug.on) {
				if(TiDebug.open) {
					TiDebug.window.close();
					TiDebug.open = false;
				} else {
					TiDebug.window.open();
					TiDebug.open = true;
				}
			}
		});
	},
	message: function(_message) {
		if(TiDebug.on) {
			TiDebug.message = _message + "\n\n" + TiDebug.message;
			TiDebug.label.text = TiDebug.message;
		}
		
		Ti.API.info(_message);
	}
};

TiDebug.init();