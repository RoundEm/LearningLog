'use strict'
	
const viewLogId = window.location.pathname.split('/')[2];

function handleGetLog(err, log) {
	if (err) {
		return console.log(err);
	} 
	$('.render-log-section').empty().append(renderViewLog(log));
}

function bindHandlers() {
	$('#editLog').click(function() {
		let logId = $(this).siblings('.render-log-section').find('.logId').text();
		window.location.href = `/edit-log/${logId}`;
	});
	$('#returnBtn').click(function() {
		window.location.href = '/view-logs';
	});
}

function initViewLog() {
	bindHandlers();
	Data.getLog(viewLogId, handleGetLog);	
}

$(initViewLog);