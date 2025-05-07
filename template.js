function getFilterFromURL() {
	const params = new URLSearchParams(window.location.search);
	return params.get('filter') || 'all';
}

const templates = [
	{
		title: '웨딩 플래너',
		description: '결혼 준비를 위한 노션 템플릿입니다.',
		type: 'notion',
		link: '#',
		video: 'https://www.youtube.com/embed/vmL-XgxwQZU?si=gcctn4yt752_3s0mm',
		image: '/thumbnail.png'
	},
	{
		title: '가계부 시트',
		description: '구글시트 기반 가계부 템플릿입니다.',
		type: 'googlesheets',
		link: '#',
		video: 'https://www.youtube.com/embed/vmL-XgxwQZU?si=gcctn4yt752_3s0m',
		image: '/thumbnail.png'
	},
	{
		title: '일정 관리 보드',
		description: '프로젝트 일정을 관리하는 노션 보드입니다.',
		type: 'notion',
		link: '#',
		video: 'https://www.youtube.com/embed/vmL-XgxwQZU?si=gcctn4yt752_3s0m',
		image: '/thumbnail.png'
	}
];

function renderTemplates(filter) {
	const filtered = (!filter || filter == 'all' )
		? templates
		: templates.filter(t => t.type.toLowerCase() === filter.toLowerCase());

	const container = document.getElementById('template-list');
	container.innerHTML = ''; // 초기화

	if (filtered.length === 0) {
		container.innerHTML = '<p>해당 템플릿이 없습니다.</p>';
		return;
	}

	filtered.forEach(t => {
		const row = document.createElement('div');
		row.className = 'template-row';

		const item = document.createElement('div');
		item.className = 'template-card';
		item.dataset.type = t.type;

		const h3 = document.createElement('h3');
		h3.textContent = t.title;
		h3.className = 'template-title';

		const desc = document.createElement('p');
		desc.textContent = t.description;
		desc.className = 'template-desc';

		const link = document.createElement('a');
		link.href = t.link;
		link.textContent = '템플릿 보기';
		link.className = 'template-link';

		const image = document.createElement('img');
		image.src = t.image;
		image.alt = `${t.title} image`;
		image.className = 'template-image';

		item.append(image, h3, desc, link);

		const video = document.createElement('div');
		video.className = 'template-video';
		video.innerHTML = `
		<iframe width="400" height="225" src="${t.video}" 
			frameborder="0" allowfullscreen></iframe>
		`;

		row.append(item, video);
		container.appendChild(row);
	});
}

function initTemplateModule() {
	const filter = getFilterFromURL();

	const retry = () => {
		const container = document.getElementById('template-list');
		if (container) {
		console.log('Filter value:', filter);
		renderTemplates(filter);
		} else {
		console.log('Waiting for template-list...');
		setTimeout(retry, 30);
		}
	};

	retry();
}

setTimeout(initTemplateModule, 0);

window.initTemplateModule = initTemplateModule;