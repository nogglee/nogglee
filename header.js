function initHeaderEvents() {
	document.getElementById('logo')?.addEventListener('click', () => {
		loadModule('content', 'landing');
	});

	document.querySelectorAll('.nav-items').forEach(item => {
		item.addEventListener('click', () => {
			const label = item.textContent.trim();
			console.log('Clicked label:', label);
			
			if (label === '소개') loadModule('content', 'about');
			else if (label === '템플릿') {
				loadModule('content', 'template?filter=all').then(() => {
					if (typeof window.initTemplateModule === 'function') {
						window.initTemplateModule();
					}
				});
			}
	
			else if (label === '포트폴리오') loadModule('content', 'portfolio');
			else if (label === 'B2B') loadModule('content', 'b2b');

			if (label !== '템플릿') {
				const url = new URL(window.location);
				url.search = '';
				history.replaceState(null, '', url.toString());
			}
		});
	});
}
function initTemplateModule() {
	const filter = getFilterFromURL();
	console.log('📌 initTemplateModule 실행됨. filter:', filter);

	const retry = () => {
		const container = document.getElementById('template-list');
		if (container) {
			console.log('✅ container 있음, 렌더링 시작');
			renderTemplates(filter);
		} else {
			console.log('⏳ container 없음, 재시도');
			setTimeout(retry, 100);
		}
	};

	retry();
}

document.querySelectorAll('.sub-nav-items').forEach(sub => {
	sub.addEventListener('click', () => {
		const type = sub.textContent.trim().toLowerCase();
		loadModule('content', `template?filter=${type}`).then(() => {
		if (typeof window.initTemplateModule === 'function') {
			window.initTemplateModule();
		}
		});
	});
});

function waitForLoadModuleThenInit() {
	if (typeof loadModule === 'function') {
		initHeaderEvents();
	} else {
		setTimeout(waitForLoadModuleThenInit, 50);
	}
}

waitForLoadModuleThenInit();