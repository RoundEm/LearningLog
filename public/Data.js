var Data = {
	getLog: function (logId, cb) {
		$.ajax({
			url: `/logEntries/${logId}`,
			type: 'GET',
			success: function(res) {
		   		cb(null, res);
		   	},
		   	error: function(err) {
		   		cb(err);
		   	}
		})
	},
	getLogs: function (cb) {
		$.ajax({
			url: '/logEntries',
			type: 'GET',
			success: function(res) {
				cb(null, res);
			},
			error: function() {
				cb(err);
			}
		});
	},
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
		})
	},
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