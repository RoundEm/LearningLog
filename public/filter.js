// 1. Client side filtering:

const logs = [...]
const activeType = ''

// check if logs are in activeTypes

const filteredLogs = logs.map(function(log) {
	return log.type in activeTypes; // return bool
})

// const x = [1, 2, 3]
// const y = x.map(function(num) {
// 	return num % 2 === 0;
// })


// 2. Server side

// GET /logEntries?type=x
...(req, res) => {
	req.query = { type: 'x' }
	const query = req.query;
	Log.find(query, function (err, docs) {
	  // docs is an array
	});
}
