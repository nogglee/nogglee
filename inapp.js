// Unified, immediate in-app browser denial and redirect logic for nogglee
(function () {
	const useragt = navigator.userAgent.toLowerCase();
	const target_url = location.href;

	const isKakao = useragt.includes('kakaotalk');
	const isLine = useragt.includes('line');
	const isIOS = /iphone|ipad|ipod/i.test(useragt);
	const isMobile = /iphone|ipad|ipod|android|blackberry|iemobile|opera mini/i.test(useragt);
	const isAlreadyOnMobileSubdomain = location.host.startsWith('m.');
	const isInApp = useragt.match(/inapp|naver|snapchat|wirtschaftswoche|thunderbird|instagram|everytimeapp|whatsApp|electron|wadiz|aliapp|zumapp|iphone(.*)whale|android(.*)whale|kakaostory|band|twitter|DaumApps|DaumDevice\/mobile|FB_IAB|FB4A|FBAN|FBIOS|FBSS|trill|SamsungBrowser\/[^1]/i);

	// 1. KakaoTalk in-app takes precedence
	if (isKakao) {
		try {
			location.href = 'kakaotalk://web/openExternal?url=' + encodeURIComponent(target_url);
		} catch (e) {
			if (/android/i.test(useragt)) {
				location.href = 'intent://' + target_url.replace(/^https?:\/\//, '') + '#Intent;scheme=http;package=com.android.chrome;end';
			}
		}
		return;
	}

	// 2. Line in-app takes precedence
	if (isLine) {
		location.href = target_url + (target_url.includes('?') ? '&' : '?') + 'openExternalBrowser=1';
		return;
	}

	// 3. Other in-app browsers
	if (isInApp) {
		if (isIOS) {
			document.head.innerHTML = '';
			document.body.innerHTML = `
				<style>
					body { margin: 0; padding: 0; font-family: 'Noto Sans KR', sans-serif; overflow: hidden; height: 100%; }
				</style>
				<h2 style='padding-top:50px; text-align:center;'>인앱브라우저 호환문제로 인해<br />Safari로 접속해야합니다.</h2>
				<article style='text-align:center; font-size:17px; word-break:keep-all; color:#999;'>
					아래 버튼을 눌러 Safari를 실행해주세요<br />
					Safari가 열리면, 주소창을 길게 터치한 뒤,<br />
					'붙여놓기 및 이동'을 누르면<br />
					정상적으로 이용할 수 있습니다.<br /><br />
					<button onclick='(function(){const t=document.createElement("textarea");document.body.appendChild(t);t.value=window.location.href;t.select();document.execCommand("copy");document.body.removeChild(t);alert("URL주소가 복사되었습니다.\\n\\nSafari에서 주소창을 길게 터치한 후 \\\"붙여놓기 및 이동\\\"을 선택하세요.");location.href="x-web-search://?"})()'
						style='min-width:180px;margin-top:10px;height:54px;font-weight:700;background-color:#31408E;color:#fff;border-radius:4px;font-size:17px;border:0;'>Safari로 열기</button>
				</article>
				<img style='width:70%;margin:50px 15% 0 15%' src='https://tistory3.daumcdn.net/tistory/1893869/skin/images/inappbrowserout.jpeg' />
			`;
		} else {
			location.href = 'intent://' + target_url.replace(/^https?:\/\//, '') + '#Intent;scheme=http;package=com.android.chrome;end';
		}
		return;
	}

	// 4. 마지막으로, 일반 모바일 기기라면 m.nogglee.com으로 리디렉션
	if (isMobile && !isAlreadyOnMobileSubdomain) {
		window.location.replace('https://m.nogglee.com' + window.location.pathname + window.location.search + window.location.hash);
	}
})();