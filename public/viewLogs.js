// $(Logs.setupViewLogs);
let logsData = {}

function processLogData(data) {
		logsData = data;
		console.log('data:', data);
		const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
		for (let i = 0; i < data.length; i++) {
			let d = new Date(data[i].publishDate);
			let hour = d.getHours();
			let minutes = d.getMinutes();
			if (minutes < 10) {
				minutes = `0${minutes}`;
			}
			// remove milliSecs in production
			let milliSecs = d.getMilliseconds();
			let year = d.getFullYear();
			let month = d.getMonth() + 1;
			let dateOfMonth = d.getDate();
			let dayOfWeekIndex = d.getDay();
			let dayOfWeek = daysOfWeek[dayOfWeekIndex];
			logsData[i].dateTime = `${dayOfWeek} - ${month}/${dateOfMonth}/${year} - ${hour}:${minutes}:${milliSecs}`;
		}
		displayLogData(logsData);
}

function displayLogData(data) {
	console.log('displayLogsData data:', data);
	let logList = '';
	for (let i = 0; i < data.length; i++) {
		let logContent = data[i].content;
		let logDateTime = data[i].publishDate;
		let logTitle = data[i].title;
		let logTag = data[i].tag;
		let logID = data[i].id;
		logList +=
			`<div class="logEntry">	
				<p>${logTitle}</p>
				<p>${logTag}</p>
				<p>${logContent}</p>
				<p>${logDateTime}</p>
				<p class="entryId" hidden>${logID}</p>
			</div>`;
	}
	$('.render-log-section').empty().append(logList);
}


function bindHandlers() {
	$('.render-log-section').on('click', '.logEntry', function() {
		let entryId = $(this).find('.entryId').text();
		console.log('entryId:', entryId);

		// pass object to getLogData request 
		window.location.href = '/view-log';
	});

	// sorting logs
	$('select').change(function() {
		let sortValue = $(this).val();
		console.log('sortValue:', sortValue);
		if (sortValue === 'log_newest') {
			Logs.logsData.sort((a, b) => {
				return b.publishDate - a.publishDate;
			});
		} else if (sortValue === 'log_oldest') {
			Logs.logsData.sort((a, b) => {
				return a.publishDate - b.publishDate;
			});
		} else if (sortValue === 'tag_a') {
			Logs.logsData.sort((a, b) => {
				let _a = a.tag.toLowerCase();
				let _b = b.tag.toLowerCase();
				if (_a < _b) return -1;
				if (_a > _b) return 1;
				return 0;
			});
		} else {
			Logs.logsData.sort((a, b) => {
				let _a = a.tag.toLowerCase();
				let _b = b.tag.toLowerCase();
				if (_b < _a) return -1;
				if (_b > _a) return 1;
				return 0;
			});
		}
		// pass sorted object somewhere so it can be rendered
	});
	$('#editLog').click(function() {
		let entryId = $(this).siblings('.render-log-section').find('.entryId').text();
		window.location.href = `/edit-log/${entryId}`;
	});
}

function initViewLogs() {
	bindHandlers();
	Data.getLogs(processLogData);

}

// function initViewLogs() {
// 	bindHandlers();
// 	Data.getLogs(function(err, data) {
// 		Logs.displayLogData(data);
// 	});
// }

$(initViewLogs);