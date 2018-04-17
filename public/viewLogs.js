'use strict'

let logsData = [];

function handleLogs(err, logs) {
	if (err) {
		return console.log(err);
	}
	logsData = logs;
	for (let i = 0; i < logsData.length; i++) {
		logsData[i].publishDateParsed = Date.parse(logsData[i].publishDate);
	}
	sortLogs();
}

function sortLogs(sortValue) {
	if (logsData.length === 0) {
		$('.render-log-error').html(`<p class="no-logs">You currently have no log entries for this type</p>`);
		$('#sort-select').prop('disabled', true);
	} else {
		$('.render-log-error').empty();
		$('#sort-select').prop('disabled', false);	
	}
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
	console.log('sorted logsData:', logsData)
	const logsHTML = renderLogs(logsData);

	// $('#log-table').children().not(':first').empty();
	let renderedTable = $('table');
	renderedTable.find("tr:gt(0)").empty();
	$('#table-head-row').after(logsHTML.join(''));	
}

function bindHandlers() {
	$('#log-table').on('click', '.log-entry', function() {
		let logId = $(this).find('.log-id').text();
		window.location.href = `/view-log/${logId}`;
	});
	$('#log-table').on('keypress', '.log-entry', function() {
		let logId = $(this).find('.log-id').text();
		window.location.href = `/view-log/${logId}`;
	});
	$('.new-page').keypress((event) => {
		if (event.which === 13) {
			window.location.href = '/add-log'
		}
	});
	$('#sort-select').change(function() {
		let sortValue = $(this).val();
		sortLogs(sortValue);
	});
	$('#filter-select').change(function() {
		let filterValue = $(this).val();
		Data.getLogs(handleLogs, { type: filterValue });
	});
}

function initViewLogs() {
	bindHandlers();
	Data.getLogs(handleLogs);
}

$(initViewLogs);