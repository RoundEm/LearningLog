function renderLog(log) {
	const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
	let d = new Date(+log.publishDate);
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
	const dateTime = `${dayOfWeek} - ${month}/${dateOfMonth}/${year} - ${hour}:${minutes}:${milliSecs}`;
	return `<div class="logEntry">	
				<p>${log.title}</p>
				<p>${log.tag}</p>
				<p>${log.content}</p>
				<p>${dateTime}</p>
				<p class="entryId" hidden>${log.id}</p>
			</div>`;
}

function renderLogs(logs) {
	return logs.map(function(log) {
		return renderLog(log);
	});
}