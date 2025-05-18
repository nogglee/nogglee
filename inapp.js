(function () {
	const ua = navigator.userAgent.toLowerCase();
	const href = window.location.href;

	const isIOS = /iphone|ipad|ipod/.test(ua);
	const isAndroid = /android/.test(ua);
	const isMobile = /iphone|ipad|ipod|android|mobile|blackberry|iemobile|opera mini/.test(ua);
	const isAlreadyOnM = location.host.startsWith('m.');
	const isInApp = /(kakaotalk|line|instagram|naver|everytime|electron|daum|fb_iab|fb4a|fbios|fban|whatsapp|band|zumapp|aliapp|whale|trill|snapchat|samsungbrowser)/i.test(ua);

	if (isInApp) {
		document.body.innerHTML = `
			<style>
				body { margin: 0; padding: 0; font-family: 'Noto Sans KR', sans-serif; overflow: hidden; height: 100%; }
			</style>
			<h2 style='padding-top:50px; text-align:center;'>인앱브라우저 호환문제로 인해<br />일반 브라우저로 접속해 주세요.</h2>
			<article style='text-align:center; font-size:17px; word-break:keep-all; color:#999;'>
				아래 버튼을 눌러 주소를 복사하세요.<br />
				브라우저를 직접 열고 주소창에 붙여넣으면<br />
				정상적으로 이용하실 수 있습니다.<br /><br />
				<button onclick='(function(){
					const t=document.createElement("textarea");
					document.body.appendChild(t);
					t.value=window.location.href;
					t.select();
					document.execCommand("copy");
					document.body.removeChild(t);
					alert("주소가 복사되었습니다. 일반 브라우저에서 붙여넣어 주세요.");
				})()'
				style='min-width:180px;margin-top:10px;height:54px;font-weight:700;background-color:#31408E;color:#fff;border-radius:4px;font-size:17px;border:0;'>주소 복사하기</button>
			</article>
			<img style='width:70%;margin:50px 15% 0 15%' src='https://tistory3.daumcdn.net/tistory/1893869/skin/images/inappbrowserout.jpeg' />
		`;
		return;
	}

	if (isMobile && !isAlreadyOnM) {
		window.location.replace('https://m.nogglee.com' + window.location.pathname + window.location.search + window.location.hash);
	}
})();