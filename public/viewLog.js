'use strict'
	
const viewLogId = window.location.pathname.split('/')[2];

function handleGetLog(err, log) {
	if (err) {
		return console.log(err);
	} 
	$('.render-log-section').empty().append(renderLog(log));
}

function bindHandlers() {
	$('#editLog').click(function() {
		let entryId = $(this).siblings('.render-log-section').find('.entryId').text();
		window.location.href = `/edit-log/${entryId}`;
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