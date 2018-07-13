const Data = {
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
	// GET all logs by type
	getLogs: function (cb, query) {
		let url = '/logEntries';
		if (query && query.type !== 'all') {
			url += `?type=${query.type}`;
		}
		console.log('url', url)
		$.ajax({
			url: url,
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
	postLog: function(newLog, cb) {
		$.ajax({
			url: '/logEntries',
			type: 'POST',
			data: newLog,
			success: function(res) {
		   		cb(null, res);
		   	},
		   	error: function(err) {
		   		cb(err);
		   	}
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