var Data = {
	// GET log entry by id
	getLog: function (logId, cb) {
		$.ajax({
			url: `/logEntries/${logId}`,
			type: 'GET',
			success: function(res) {
				console.log('getLog:', res);
				cb(null, res);
		   	},
		   	error: function(err) {
		   		cb(err);
		   	}
		});
	},
	// GET all log entries
	getLogs: function (cb) {
		$.ajax({
			url: '/logEntries',
			type: 'GET',
			success: function(res) {
				cb(null, res);
			},
			error: function(err) {
				cb(err);
			}
		});
	},
	// POST new log entry
	postLog: function(cb) {
		$.ajax({
			url: '/logEntries',
			type: 'POST',
			success: function(res) {
		   		cb(null, res);
		   	},
		   	error: function(err) {
		   		cb(err);
		   	}
		});
	},
	// PUT updates on log by id
	updateLog: function(logId, newLog, cb) {
		$.ajax({
		   url: `/logEntries/${logId}`,
		   type: 'PUT',
		   data: newLog,
		   success: function(res) {
		   		cb(null, res);
		   },
		   error: function(err) {
		   		cb(err);
		   }
		});
	},
	// DELETE log by id
	removeLog: function(logId, cb) {
		$.ajax({
		   url: `/logEntries/${logId}`,
		   type: 'DELETE',
		   success: function(res) {
		   		cb(null, res);
		   },
		   error: function(err) {
		   		cb(err);
		   }
		});
	}
}