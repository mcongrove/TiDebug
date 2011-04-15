var TiDebug = {
	text: "",
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
	message: function(_text) {
		if(TiDebug.on) {
			TiDebug.text = _text + "\n\n" + TiDebug.text;
			TiDebug.label.text = TiDebug.text;
		}
		
		Ti.API.info(_text);
	}
};

TiDebug.init();