// create a base window

var _ = require('underscore');

var baseWindow = Ti.UI.createWindow({
	backgroundColor : 'white',
	navBarHidden : true,
	exitOnClose : true
});

var temp = 0;

function createGenericWindow(color) {
	var win = Ti.UI.createWindow({
		title : color,
		backgroundColor : color,
		exitOnClose : false
	});

	var button = Ti.UI.createButton({
		height : '44dp',
		width : '80%',
		title : 'open next window'
	});
	button.addEventListener('click', function(e) {
		var newWin = createGenericWindow(get_random_color());
		newWin.nav = win.nav;
		win.nav.openNextWindow(newWin);
	});
	win.add(button);
	return win;
}

function createGreenWindow() {
	return createGenericWindow('green');
}

function createBlueWindow() {
	return createGenericWindow('blue');
}

function createPurpleWindow() {
	return createGenericWindow('purple');
}

function createYellowWindow() {
	return createGenericWindow('yellow');
}

function createPinkWindow() {
	return createGenericWindow('pink');
}

var slider = require('slider').createSlider();

var data = [{
	title : 'Green',
	createWindowFunction : createGreenWindow
}, {
	title : 'Blue',
	createWindowFunction : createBlueWindow
}, {
	title : 'Purple',
	createWindowFunction : createPurpleWindow
}, {
	title : 'Yellow',
	createWindowFunction : createYellowWindow
}, {
	title : 'Pink',
	createWindowFunction : createPinkWindow
}];

var tableData = [];

_.each(data, function(obj, i) {
	slider.addWindow({
		createFunction : obj.createWindowFunction
	});
	tableData.push({
		title : obj.title
	});
});

var table = Ti.UI.createTableView();
table.setData(tableData);

table.addEventListener('click', function(e) {
	Ti.API.debug('table heard click');
	slider.selectAndClose(e.index);
});

baseWindow.add(table);
baseWindow.add(slider);

var started = false;

baseWindow.addEventListener('open', function() {
	/* Wierd - open event on baseWindow gets fired
	 every time slider fires event 'open'. Using
	 started variabled to make sure this only gets
	 run once */
	if (!started) {
		slider.showWindow(0);
		started = true;
	}
});

function listenForBackButton() {
	slider.back();
}

slider.addEventListener('open', function() {
	Ti.API.debug('baseWindow heard open');
	baseWindow.removeEventListener('android:back', listenForBackButton);
});

slider.addEventListener('close', function() {
	Ti.API.debug('baseWindow heard close');
	baseWindow.addEventListener('android:back', listenForBackButton);
});

baseWindow.open();

function get_random_color() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.round(Math.random() * 15)];
	}
	return color;
}
