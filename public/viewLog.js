// Logs.viewLogData()
	// .then(Logs.editLog());
	
const viewLogId = window.location.pathname.split('/')[2];

function initViewLog() {
	Data.getLog(viewLogId, function(err, data) {
		Logs.displayLogsData([data]);
	});	
}

initViewLog();