'use strict'
	
const viewLogId = window.location.pathname.split('/')[2];

function handleGetLog(err, log) {
	if (err) {
		return console.log(err);
	} 
	$('.render-log-section').empty().append(renderViewLog(log));
}

function bindHandlers() {
	$('#edit-log').click(function() {
		let logId = $(this).siblings('.render-log-section').find('.log-id').text();
		window.location.href = `/edit-log/${logId}`;
	});
	$('#return-btn').click(() =>  {
		window.location.href = '/view-logs';
	});
	$('button').focus(function() {
		$(this).css('background-color', '#ffde4d');
	});
	$('button').blur(function() {
		$(this).css('background-color', 'white');
	});
}

function initViewLog() {
	bindHandlers();
	Data.getLog(viewLogId, handleGetLog);	
}

$(initViewLog);