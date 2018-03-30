var Data = {
	getLogs: function () {

	},
	getLog: function (logId, cb) {
		$.getJSON(`/logEntry/${logId}`, cb);
	},
	updateLog: function(logId, newLog, cb) {
		
	}
}