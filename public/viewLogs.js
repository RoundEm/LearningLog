// $(Logs.setupViewLogs);

function initViewLogs() {
	Data.getLogs(function(err, data) {
		Logs.displayLogsData(data);
	});
}

initViewLogs()