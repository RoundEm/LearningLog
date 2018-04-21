'use strict'

function renderLog(log) {
	let dateTime = formatDateTime(log.publishDate);
	return `<tr class="log-entry" tabindex="0">
				<td>${log.title}</td>
				<td>${log.tag}</td>
				<td>${log.type}</td>
				<td class="col-date">${dateTime}</td>
				<td class="log-id" hidden>${log.id}</td>
			</tr>`
}

function renderLogs(logs) {
	return logs.map(function(log) {
		return renderLog(log);
	});
}

function renderViewLog(log) {
	let dateTime = formatDateTime(log.publishDate);
	return `<div class="view-log">
				<span tabindex="0">Title:</span>	
				<p tabindex="0">${log.title}</p>
				<span tabindex="0">Content:</span>
				<p tabindex="0">${log.content}</p>
				<span tabindex="0">Tag:</span>
				<p tabindex="0">${log.tag}</p>
				<span tabindex="0">Type:</span>
				<p tabindex="0">${log.type}</p>
				<span tabindex="0">Last Saved:</span>
				<p tabindex="0">${dateTime}</p>
				<p class="log-id" hidden>${log.id}</p>
			</div>`;
}

function formatDateTime(publishDate) {
	// const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
	let d = new Date(publishDate);
	let hour = d.getHours();
	let minutes = d.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}
	let year = d.getFullYear();
	let month = d.getMonth() + 1;
	let dateOfMonth = d.getDate();
	// let dayOfWeekIndex = d.getDay();
	// let dayOfWeek = daysOfWeek[dayOfWeekIndex];
	const dateTime = `${month}/${dateOfMonth}/${year} - ${hour}:${minutes}`;
	return dateTime;
}

