'use strict'

let logsData = {}

function handleLogs(err, logs) {
	if (err) {
		return console.log(err);
	}
	// Assign data to logsData so it can be temporarily stored for sorting
	logsData = logs;
	const logsHTML = renderLogs(logs);
	$('.render-log-section').empty().append(logsHTML.join(''));
}

function bindHandlers() {

	// Grab entry ID for targeting during log click
	$('.render-log-section').on('click', '.logEntry', function() {
		let entryId = $(this).find('.entryId').text();
		window.location.href = `/view-log/${entryId}`;
	});

	// Sort logs
	$('select').change(function() {
		let sortValue = $(this).val();
		console.log('sortValue:', sortValue);
		if (sortValue === 'log_newest') {
			logsData.sort((a, b) => {
				return b.publishDate - a.publishDate;
			});
		} else if (sortValue === 'log_oldest') {
			logsData.sort((a, b) => {
				return a.publishDate - b.publishDate;
			});
		} else if (sortValue === 'tag_a') {
			logsData.sort((a, b) => {
				let _a = a.tag.toLowerCase();
				let _b = b.tag.toLowerCase();
				if (_a < _b) return -1;
				if (_a > _b) return 1;
				return 0;
			});
		} else {
			logsData.sort((a, b) => {
				let _a = a.tag.toLowerCase();
				let _b = b.tag.toLowerCase();
				if (_b < _a) return -1;
				if (_b > _a) return 1;
				return 0;
			});
		}

		handleLogs(null, logsData);
	});
}

function initViewLogs() {
	bindHandlers();
	Data.getLogs(handleLogs);
}

$(initViewLogs);