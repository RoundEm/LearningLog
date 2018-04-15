'use strict'

let logsData = [];

function handleLogs(err, logs) {
	if (err) {
		return console.log(err);
	}
	if (logs.length === 0) {
		$('.render-log-section').empty().append(`<p class="noLogs">You currently have no log entries</p>`)
	}
	logsData = logs;
	for (let i = 0; i < logsData.length; i++) {
		logsData[i].publishDateParsed = Date.parse(logsData[i].publishDate);
	}
	sortLogs(logsData);
}

function sortLogs(logsData, sortValue) {
	if (sortValue === undefined) {
		logsData.sort(function(a, b) {
			return b.publishDateParsed - a.publishDateParsed;
		});
	} else if (sortValue === 'log_newest') {
		logsData.sort(function(a, b) {
			return b.publishDateParsed - a.publishDateParsed;
		});
	} else if (sortValue === 'log_oldest') {
		logsData.sort(function(a, b) {
			return a.publishDateParsed - b.publishDateParsed;
		});
	} else if (sortValue === 'tag_a') {
		logsData.sort(function(a, b) {
			let _a = a.tag.toLowerCase();
			let _b = b.tag.toLowerCase();
			if (_a < _b) return -1;
			if (_a > _b) return 1;
			return 0;
		});
	} else {
		logsData.sort(function(a, b) {
			let _a = a.tag.toLowerCase();
			let _b = b.tag.toLowerCase();
			if (_b < _a) return -1;
			if (_b > _a) return 1;
			return 0;
		});
	}
	const logsHTML = renderLogs(logsData);
	$('#tableHeadRow').nextAll().empty();
	$('#tableHeadRow').after(logsHTML.join(''));
}

function bindHandlers() {
	$('#logTable').on('click', '.logEntry', function() {
		let logId = $(this).find('.logId').text();
		window.location.href = `/view-log/${logId}`;
	});
	$('#logTable').on('keypress', '.logEntry', function() {
		let logId = $(this).find('.logId').text();
		window.location.href = `/view-log/${logId}`;
	});

	$('.newPage').keypress((event) => {
		if (event.which === 13) {
			window.location.href = '/add-log'
		}
	});

	$('select').change(function() {
		let sortValue = $(this).val();
		sortLogs(logsData, sortValue);
	});
}

function initViewLogs() {
	bindHandlers();
	Data.getLogs(handleLogs);
}

$(initViewLogs);