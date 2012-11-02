var isAndroid = (Ti.Platform.osname === 'android');

exports.createNavigationWindow = function(baseWindow) {

	var me;
	var windows = [];

	if (isAndroid) {
		me = baseWindow;
		windows.push(baseWindow);
	} else {
		var me = Ti.UI.createWindow({
			backgroundColor : 'black'
		});
		me.orientationModes = [Ti.UI.PORTRAIT];
		me.nav = Ti.UI.iPhone.createNavigationGroup({
			window : baseWindow
		});
		me.add(me.nav);
		windows.push(baseWindow);
	};

	me.closeTopWindow = function() {
		if (windows.length <= 1) {
			return;
		}
		var lastWindow = windows[windows.length - 1];
		if (isAndroid) {
			lastWindow.close();
		} else {
			me.nav.close(lastWindow);
		}
		windows.pop();
	};

	me.openNextWindow = function(/*Ti.UI.Window*/windowToOpen) {
		if (isAndroid) {
			windowToOpen.open({
				animated : true
			});
		} else {
			me.nav.open(windowToOpen);
		}
		windows.push(windowToOpen);
		Ti.API.debug('total windows=' + windows.length);
	};

	me.windowCount = function() {
		return windows.length;
	};

	return me;
};
