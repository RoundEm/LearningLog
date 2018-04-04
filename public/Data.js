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

				// should this null be removed??
				cb(null, res);
			},
			error: function(err) {
				cb(err);
			}
		});
	},
	// POST new log entry
	postLog: function(newLog) {
		$.ajax({
			url: '/logEntries',
			type: 'POST',
			data: newLog,

			// What to do with callback??
			// success: function(res) {
		 //   		cb(res);
		 //   	},
		 //   	error: function(err) {
		 //   		cb(err);
		 //   	}
		});
	},
	// PUT updates on log by id
	updateLog: function(logId, updatedLog, cb) {
		$.ajax({
		   url: `/logEntries/${logId}`,
		   type: 'PUT',
		   data: updatedLog,
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