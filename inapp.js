(function () {
	const ua = navigator.userAgent.toLowerCase();
	const href = window.location.href;

	const isIOS = /iphone|ipad|ipod/.test(ua);
	const isAndroid = /android/.test(ua);
	const isMobile = /iphone|ipad|ipod|android|mobile|blackberry|iemobile|opera mini/.test(ua);
	const isAlreadyOnM = location.host.startsWith('m.');
	const isInApp = /(kakaotalk|line|instagram|naver|everytime|electron|daum|fb_iab|fb4a|fbios|fban|whatsapp|band|zumapp|aliapp|whale|trill|snapchat|samsungbrowser)/i.test(ua);

	if (isInApp) {
		if (isAndroid) {
			location.href = 'intent://' + href.replace(/^https?:\/\//, '') + '#Intent;scheme=https;package=com.android.chrome;end';
		} else if (isIOS) {
			document.body.innerHTML = `
				<style>
					body { margin: 0; padding: 0; font-family: 'Noto Sans KR', sans-serif; overflow: hidden; height: 100%; }
				</style>
				<h2 style='padding-top:50px; text-align:center;'>인앱브라우저 호환문제로 인해<br />Safari로 접속해야 합니다.</h2>
				<article style='text-align:center; font-size:17px; word-break:keep-all; color:#999;'>
					아래 버튼을 눌러 Safari를 실행해주세요.<br />
					Safari가 열리면 주소창을 길게 터치한 뒤,<br />
					'붙여놓기 및 이동'을 누르면<br />
					정상적으로 이용할 수 있습니다.<br /><br />
					<button onclick='(function(){
						const t=document.createElement("textarea");
						document.body.appendChild(t);
						t.value=window.location.href;
						t.select();
						document.execCommand("copy");
						document.body.removeChild(t);
						alert("URL주소가 복사되었습니다.\\n\\nSafari에서 주소창을 길게 터치한 후 \\\"붙여놓기 및 이동\\\"을 선택하세요.");
						location.href="x-web-search://?";
					})()'
					style='min-width:180px;margin-top:10px;height:54px;font-weight:700;background-color:#31408E;color:#fff;border-radius:4px;font-size:17px;border:0;'>Safari로 열기</button>
				</article>
				<img style='width:70%;margin:50px 15% 0 15%' src='https://tistory3.daumcdn.net/tistory/1893869/skin/images/inappbrowserout.jpeg' />
			`;
		}
		return;
	}

	if (isMobile && !isAlreadyOnM) {
		window.location.replace('https://m.nogglee.com' + window.location.pathname + window.location.search + window.location.hash);
	}
})();