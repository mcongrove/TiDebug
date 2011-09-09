var TiDebug = {
	configData: {
		appName: "",
		appVersion: "",
		email: null
	},
	enabled: false,
	message: Ti.Platform.id + "\n\n" + Ti.Platform.name + " " + Ti.Platform.version + "\n\n=====",
	open: false,
	enable: function(params) {
		TiDebug.enabled = true;
		
		for(key in params) {
			TiDebug.configData[key] = params[key];
		}
		
		TiDebug.init();
	},
	init: function() {
		TiDebug.message = "=====\n\n" + TiDebug.configData.appName + " " + TiDebug.configData.appVersion + "\n\n" + TiDebug.message;
		
		TiDebug.win				= Ti.UI.createWindow({ title: "Debug", backgroundColor: "#FFF", barColor: "#000" });
		TiDebug.view			= Ti.UI.createTableView();
		TiDebug.console			= Ti.UI.createWindow({ backgroundColor: "#000" });
		TiDebug.menu			= Ti.UI.createButtonBar({ labels: [ "Close", "Scroll to Top" ], backgroundColor: "#222", top: 20, left: 20, style: Titanium.UI.iPhone.SystemButtonStyle.BAR, height: 30, width: 280 });
		TiDebug.consoleView		= Ti.UI.createScrollView({ top: 0, width: 320, height: 460, contentHeight: 5000 });
		TiDebug.consoleLabel	= Ti.UI.createLabel({ text: TiDebug.message, height: "auto", top: 70, left: 20, width: 280, color: "#00FF00", font: { size: 11 }});
		
		var rows = [];
		var row = null;
		
		row = Ti.UI.createTableViewRow({ title: "App Version", selectedBackgroundColor: "#FFF", selectedColor: "#000" });
		var versionLabel = Ti.UI.createLabel({ text: TiDebug.configData.appVersion, right: 10, textAlign: "right" });
		row.add(versionLabel);
		rows.push(row);
		
		row = Ti.UI.createTableViewRow({ title: "Console", hasChild: true, selectedBackgroundColor: "#FFF", selectedColor: "#000" });
		row.addEventListener("click", function(e) { TiDebug.console.open(); });
		rows.push(row);
		
		if(TiDebug.configData.email) {
			row = Ti.UI.createTableViewRow({ title: "E-Mail Debug Information", hasChild: true, selectedBackgroundColor: "#FFF", selectedColor: "#000" });
			row.addEventListener("click", TiDebug.emailDebug);
			rows.push(row);
		}
		
		TiDebug.menu.addEventListener("click", function(_event) {
			if(_event.index == 0) {
				TiDebug.console.close();
			} else {
				TiDebug.consoleView.scrollTo(0, 0);
			}
		});
		
		TiDebug.view.setData(rows);
		TiDebug.win.add(TiDebug.view);
		TiDebug.consoleView.add(TiDebug.consoleLabel);
		TiDebug.console.add(TiDebug.consoleView);
		TiDebug.console.add(TiDebug.menu);
	},
	show: function(_event) {
		TiDebug.win.open();
		TiDebug.open = true;
	},
	hide: function(_event) {
		TiDebug.win.close();
		TiDebug.open = false;
	},
	toggle: function(_event) {
		if(TiDebug.open) {
			TiDebug.hide();
		} else {
			TiDebug.show();
		}
	},
	emailDebug: function(_event) {
		var email = Ti.UI.createEmailDialog({
			barColor: "#000",
			subject: TiDebug.configData.appName + " Debug Information",
			toRecipients: [ TiDebug.configData.email ],
			messageBody: TiDebug.message
		});
		
		if(!email.isSupported) {
			alert("E-Mail is not supported on this device");
			return;
		}
		
		email.open();
	},
	log: function(_message) {
		Ti.API.debug(_message);
		
		TiDebug.message = _message + "\n\n" + TiDebug.message;
		
		if(TiDebug.enabled) {
			TiDebug.consoleLabel.text = TiDebug.message;
		}
	}
};