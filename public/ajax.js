'use strict';

const Ajax = {
	getData: function() {
		console.log('getData ran');
		return $.getJSON( "/logEntries", function( data ) {
			return data;
		});
	},
	processLogData: function() {
		console.log('processLogData ran');
		let data = Ajax.getData().then(function(data) {
			Ajax.displayData(data);
		});   
	},
	displayData: function(data) {
		console.log('displayData:', data);
		for (let i = 0; i < data.length; i++) {
			let logContent = data[i].content;
			let logDate = data[i].publishDate;
			let logTitle = data[i].title;
			let logTag = data[i].tag;
			$('.logList-section').append(`
				<div>
					<p>${logTitle}</p>
					<p>${logDate}</p>
					<p>${logContent}</p>
					<p>${logTag}</p>
				</div>
				`);
		}
		
	},
	setup: function() {
		console.log('setup ran');
		Ajax.processLogData();
	}
}

$(Ajax.setup);