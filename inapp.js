(function () {
	const useragt = navigator.userAgent.toLowerCase();
	const isMobile = /iphone|ipad|ipod|android|mobile|mobi|blackberry|iemobile|opera mini/i.test(useragt);

	if (isMobile) {
		window.location.replace('https://m.nogglee.com' + window.location.pathname + window.location.hash);
	}
})();