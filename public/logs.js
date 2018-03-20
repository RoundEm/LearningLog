'use strict';

const Logs = {
	logData: {},
	getData: function() {
		console.log('getData ran');
		return $.getJSON( "/logEntries", function(data) {
			Logs.logData = data;
			return data;
		});
	},
	processLogData: function() {
		console.log('processLogData ran');
		let data = Logs.getData().then(function(data) {
			console.log('data:', data);
			// format date/time
			const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
			for (let i = 0; i < data.length; i++) {
				let d = new Date(data[i].publishDate);
				let hour = d.getHours();
				let minutes = d.getMinutes();
				if (minutes < 10) {
					minutes = `0${minutes}`;
				}
				// remove milliSecs in production
				let milliSecs = d.getMilliseconds();
				let year = d.getFullYear();
				let month = d.getMonth() + 1;
				let dateOfMonth = d.getDate();
				let dayOfWeekIndex = d.getDay();
				let dayOfWeek = daysOfWeek[dayOfWeekIndex];
				Logs.logData[i].dateTime = `${dayOfWeek} - ${month}/${dateOfMonth}/${year} - ${hour}:${minutes}:${milliSecs}`;
			}
			Logs.displayData(Logs.logData);
		});   
	},
	displayData: function(logData) {
		console.log('displayData:', logData);
		let logListSections = '';
		for (let i = 0; i < logData.length; i++) {
			let logContent = logData[i].content;
			let logDateTime = logData[i].dateTime;
			let logTitle = logData[i].title;
			let logTag = logData[i].tag;
			logListSections +=
				`<div class="logEntry">	
					<p>${logTitle}</p>
					<p>${logTag}</p>
					<p>${logContent}</p>
					<p>${logDateTime}</p>
				</div>`;
		}
		$('.logList-section').empty().append(logListSections);
	},
	sortLogs: function() {
		$('select').change(function() {
			let sortValue = $(this).val();
			// console.log('sortValue:', sortValue);
			// console.log('Logs.logData:', Logs.logData);
			if (sortValue === 'log_newest') {
				Logs.logData.sort(function(a, b) {
					return b.publishDate - a.publishDate;
				});
			} else if (sortValue === 'log_oldest') {
				Logs.logData.sort(function(a, b) {
					return a.publishDate - b.publishDate;
				});
			} else if (sortValue === 'tag_a') {
				Logs.logData.sort(function(a, b) {
					if (a.tag < b.tag) return -1;
					if (a.tag > b.tag) return 1;
					return 0;
				});
			} else {
				Logs.logData.sort(function(a, b) {
					if (b.tag < a.tag) return -1;
					if (b.tag > a.tag) return 1;
					return 0;
				});
			}
			Logs.displayData(Logs.logData);
		});
	},
	setup: function() {
		Logs.processLogData();
		Logs.sortLogs();
	}
}

$(Logs.setup);	
