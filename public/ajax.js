'use strict';

const Ajax = {
	getData: function() {
		console.log('getData ran');
		return $.getJSON( "/logEntries", function( data ) {
			console.log('getData data:', data);
			return data;
		});
	},
	renderLogPage: function() {
		let data = Ajax.getData().then(function(data) {
			console.log('Render log page data', data);
		});
	},
	setup: function() {
		Ajax.renderLogPage();
		console.log('setup ran');
	}
}

$(Ajax.setup);