'use strict';

const Logs = {
	logsData: {},
	logData: {},
	editLogData: {},
	getData: function() {
		console.log('getData ran');
		return $.getJSON( "/logEntries", function(data) {
			Logs.logsData = data;
			return data;
		});
	},
	processLogData: function() {
		console.log('processLogData ran');
		let data = Logs.getData().then(function(data) {
			console.log('data:', data);
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
				Logs.logsData[i].dateTime = `${dayOfWeek} - ${month}/${dateOfMonth}/${year} - ${hour}:${minutes}:${milliSecs}`;
			}
				Logs.displayLogsData(Logs.logsData);
		});   
	},
	displayLogsData: function(logsData) {
		console.log('displayLogsData data:', logsData);
		let logList = '';
		// If single item passed is not array wrap object in array
		if (!Array.isArray(logsData)) {
			// TODO format date time for view-log page
			let newArray = [
				{
					title: logsData.title ? logsData.title : 'default title',
					tag: logsData.tag ? logsData.tag : 'default tag',
					content: logsData.content ? logsData.content : 'default content',
					id: logsData.id ? logsData.id : 'default ID',
					dateTime: logsData.publishDate ? logsData.publishDate : 'default dateTime'
				}
			];
			logsData = newArray;
		}
		for (let i = 0; i < logsData.length; i++) {
			let logContent = logsData[i].content;
			let logDateTime = logsData[i].dateTime;
			let logTitle = logsData[i].title;
			let logTag = logsData[i].tag;
			let logID = logsData[i].id;
			logList +=
				`<div class="logEntry">	
					<p>${logTitle}</p>
					<p>${logTag}</p>
					<p>${logContent}</p>
					<p>${logDateTime}</p>
					<p class="entryId" hidden>${logID}</p>
				</div>`;
		}
		console.log('logList:', logList);
		$('.render-log-section').empty().append(logList);
	},
	sortLogs: function() {
		$('select').change(function() {
			let sortValue = $(this).val();
			console.log('sortValue:', sortValue);
			if (sortValue === 'log_newest') {
				Logs.logsData.sort((a, b) => {
					return b.publishDate - a.publishDate;
				});
			} else if (sortValue === 'log_oldest') {
				Logs.logsData.sort((a, b) => {
					return a.publishDate - b.publishDate;
				});
			} else if (sortValue === 'tag_a') {
				Logs.logsData.sort((a, b) => {
					let _a = a.tag.toLowerCase();
					let _b = b.tag.toLowerCase();
					if (_a < _b) return -1;
					if (_a > _b) return 1;
					return 0;
				});
			} else {
				Logs.logsData.sort((a, b) => {
					let _a = a.tag.toLowerCase();
					let _b = b.tag.toLowerCase();
					if (_b < _a) return -1;
					if (_b > _a) return 1;
					return 0;
				});
			}
			Logs.displayLogsData(Logs.logsData);
		});
	},
	bindLogClick: function() {
		$('.render-log-section').on('click', '.logEntry', function() {
			let entryId = $(this).find('.entryId').text();
			console.log('entryId:', entryId);
			Logs.getLogData(entryId);
			window.location.href = '/view-log';
		});
	},
	getLogData: function(entry_id) {
		return $.getJSON(`/logEntry/${entry_id}`, function(data) {
			Logs.logData = data;
			return $.post('/nextLogEntry', Logs.logData);
		});
	},
	viewLogData: function() {
		return $.getJSON('/nextLogEntry', function(data) {
			Logs.displayLogsData(data);
		});
	},
	editLog: function() {
		$('#editLog').click(function() {
			let entryId = $(this).siblings('.render-log-section').find('.entryId').text();
			console.log('entryId:', entryId);
			window.location.href = `/edit-log/${entryId}`;
		});
	},
	deleteLog: function() {
		$('#deleteLog').click(function() {
			console.log('deleteLog ran')
		});
	},
	setupViewLogs: function() {
		Logs.processLogData();
		Logs.sortLogs();
		Logs.bindLogClick();
	},
	setupViewLog: function() {
		Logs.viewLogData()
			.then(Logs.deleteLog())
			.then(Logs.editLog());
	}
}

	
