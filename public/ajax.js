'use strict';

const Ajax = {
	logData: {},
	getData: function() {
		console.log('getData ran');
		return $.getJSON( "/logEntries", function(data) {
			Ajax.logData = data;
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
		let logListSections = '';
		for (let i = 0; i < data.length; i++) {
			let logContent = data[i].content;
			let logDate = data[i].publishDate;
			let logTitle = data[i].title;
			let logTag = data[i].tag;
			logListSections +=
				`<div class="logEntry">	
					<p>${logTitle}</p>
					<p>${logDate}</p>
					<p>${logContent}</p>
					<p>${logTag}</p>
				</div>`;
		}
		$('.logList-section').empty().append(logListSections);
	},
	formatDateTime: function() {
		Ajax.logData.forEach(function(i) {
			console.log('i', i);
			let d = new Date(i.publishDate);
			console.log('date:', d);
			let hour = d.getHours();
			let minutes = d.getMinutes();
			let milliSecs = d.getMilliseconds();
			let year = d.getFullYear();
			let month = d.getMonth();
			let dateOfMonth = d.getDate();
			console.log('full date:', `${month}/${dateOfMonth}/${year} - ${hour}:${minutes}:${milliSecs}`); 
		});	

	},
	sortLogs: function() {
		$('select').change(function() {
			let sortValue = $(this).val();
			// console.log('sortValue:', sortValue);
			// console.log('Ajax.logData:', Ajax.logData);
			if (sortValue === 'log_newest') {
				Ajax.logData.sort(function(a, b) {
					return b.publishDate - a.publishDate;
				});
			} else if (sortValue === 'log_oldest') {
				Ajax.logData.sort(function(a, b) {
					return a.publishDate - b.publishDate;
				});
			} else if (sortValue === 'tag_a') {
				Ajax.logData.sort(function(a, b) {
					if (a.tag < b.tag) return -1;
					if (a.tag > b.tag) return 1;
					return 0;
				});
			} else {
				Ajax.logData.sort(function(a, b) {
					if (b.tag < a.tag) return -1;
					if (b.tag > a.tag) return 1;
					return 0;
				});
			}
			Ajax.formatDateTime();
			Ajax.displayData(Ajax.logData);
		});
	},
	setup: function() {
		console.log('setup ran');
		Ajax.processLogData();
		Ajax.sortLogs();
		
	}
}

$(Ajax.setup);