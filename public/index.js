	function bindButton() {
	$('.new-page').keypress((event) => {
		if (event.which === 13) {
			window.location.href = '/view-logs'
		}
	});
	$('.new-page a').focus(function(event) {
		$('.new-page').css('background-color', '#ffde4d');
	});
	$('.new-page a').blur((event) => {
		$('.new-page').css('background-color', 'white');
	});
}

$(bindButton);