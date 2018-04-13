'use strict'

function renderLog(log) {
	let dateTime = formatDateTime(log.publishDate);
	return `<div class="logEntry" tabindex="0">
				<span>Title:</span>	
				<p>${log.title}</p><br>
				<span>Tag:</span>
				<p>${log.tag}</p><br>
				<span>Type:</span>
				<p>${log.type}</p>
				<span>Saved:</span>
				<p>${dateTime}</p>
				<p class="logId" hidden>${log.id}</p>
			</div>`;
}

function renderLogs(logs) {
	return logs.map(function(log) {
		return renderLog(log);
	});
}

function renderViewLog(log) {
	let dateTime = formatDateTime(log.publishDate);
	return `<div class="viewLog">
				<span>Title:</span>	
				<p>${log.title}</p>
				<span>Content:</span>
				<p>${log.content}</p>
				<span>Tag:</span>
				<p>${log.tag}</p>
				<span>Type:</span>
				<p>${log.type}</p>
				<span>Saved:</span>
				<p>${dateTime}</p>
				<p class="logId" hidden>${log.id}</p>
			</div>`;
}

function formatDateTime(publishDate) {
	// console.log('publishDate:', publishDate);
	const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
	let d = new Date(publishDate);
	let hour = d.getHours();
	let minutes = d.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}
	let year = d.getFullYear();
	let month = d.getMonth() + 1;
	let dateOfMonth = d.getDate();
	let dayOfWeekIndex = d.getDay();
	let dayOfWeek = daysOfWeek[dayOfWeekIndex];
	const dateTime = `${dayOfWeek} - ${month}/${dateOfMonth}/${year} - ${hour}:${minutes}`;
	return dateTime;
}

