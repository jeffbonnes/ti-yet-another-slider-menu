exports.createLongWindow = function() {

	var win = Ti.UI.createWindow({
		backgroundColor : 'white',
		title : 'Long Scrolling Test'
	});

	var webview = Ti.UI.createWebView({
		url : '/html/test.html'
	});

	win.add(webview);

	return win;

}
