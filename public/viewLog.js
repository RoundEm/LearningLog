'use strict'
	
const viewLogId = window.location.pathname.split('/')[2];

function displayLogData(err, data) {
	let dataArray = [data];
	if (err) {
		return console.log(err);
	} 
	console.log('displayLogData data:', dataArray);
	let logList = '';
	for (let i = 0; i < dataArray.length; i++) {
		let logContent = dataArray[i].content;
		let logDateTime = dataArray[i].dateTime;
		let logTitle = dataArray[i].title;
		let logTag = dataArray[i].tag;
		let logID = dataArray[i].id;
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

function bindEditBtn() {
	$('#editLog').click(function() {
		let entryId = $(this).siblings('.render-log-section').find('.entryId').text();
		window.location.href = `/edit-log/${entryId}`;
	});
}

function initViewLog() {
	bindEditBtn();
	Data.getLog(viewLogId, displayLogData);	
}

$(initViewLog);