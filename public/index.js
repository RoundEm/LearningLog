	function bindButton() {
	$('.new-page').keypress((event) => {
		if (event.which === 13) {
			window.location.href = '/view-logs'
		}
	});
	$('.new-page a').focus((event) => {
		$('.new-page').css('background-color', '#FF6F59');
	});
	$('.new-page a').blur((event) => {
		$('.new-page').css('background-color', 'white');
	});
}

$(bindButton);