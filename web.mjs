// exported things
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function Start() 
{
	await loadPagePart('landing', document.getElementById('content'));

	const form = document.getElementById('contact_form');
	if (!form) return;

	emailjs.init('YV7YzVSbiOXcul-mG'); // 📌 복사한 public key 사용

	form.addEventListener('submit', function (e) {
		e.preventDefault();

		emailjs.sendForm('service_yjixszn', 'template_44zyocm', this)
			.then(() => {
				alert('문의가 성공적으로 전송되었습니다!');
				form.reset();
			}, (error) => {
				console.error('전송 실패:', error);
				alert('전송 중 오류가 발생했습니다.');
			});
	});

	document.querySelectorAll('.cta_button').forEach(
		(ThisButton) => { ThisButton.onclick = () => { document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }) } }
	);

	renderSelectedPreviews(TEMPLATE_DATA, '#preview_template .grid', [1, 2, 3]);
	renderSelectedPreviews(PORTFOLIO_DATA, '#preview_portfolio .grid', [1, 2, 3, 4, 5, 6]);
}

// data
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const TEMPLATE_DATA = [
	{
		id: 1,
		title: 'PM을 위한 프로젝트 관리',
		description: '시간 관리를 위한 노션 템플릿입니다.',
		type: 'notion',
		link: 'https://www.notion.com/ko/templates/pm',
		video: 'https://www.youtube.com/embed/vmL-XgxwQZU?si=gcctn4yt752_3s0mm',
		image: '/m/a/thumbnail.png'
	},
	{
		id: 2,
		title: '가계부 시트',
		description: '구글시트 기반 가계부 템플릿입니다.',
		type: 'sheets',
		link: '#',
		video: 'https://www.youtube.com/embed/vmL-XgxwQZU?si=gcctn4yt752_3s0m',
		image: '/m/a/thumbnail.png'
	},
	{
		id: 3,
		title: '일정 관리 보드',
		description: '프로젝트 일정을 관리하는 노션 보드입니다.',
		type: 'notion',
		link: '#',
		video: 'https://www.youtube.com/embed/vmL-XgxwQZU?si=gcctn4yt752_3s0m',
		image: '/m/a/thumbnail.png'
	}
];

const PORTFOLIO_DATA = [
	{
		id: 1,
		title: '포트폴리오01',
		description: '시간 관리를 위한 노션 템플릿입니다.',
		type: 'plans',
		link: 'https://www.notion.com/ko/templates/pm',
		video: 'https://www.youtube.com/embed/vmL-XgxwQZU?si=gcctn4yt752_3s0mm',
		image: '/m/a/thumbnail.png'
	},
	{
		id: 2,
		title: '포트폴리오02',
		description: '구글시트 기반 가계부 템플릿입니다.',
		type: 'tools',
		link: '#',
		video: 'https://www.youtube.com/embed/vmL-XgxwQZU?si=gcctn4yt752_3s0m',
		image: '/m/a/thumbnail.png'
	},
	{
		id: 3,
		title: '포트폴리오03',
		description: '프로젝트 일정을 관리하는 노션 보드입니다.',
		type: 'apps',
		link: '#',
		video: 'https://www.youtube.com/embed/vmL-XgxwQZU?si=gcctn4yt752_3s0m',
		image: '/m/a/thumbnail.png'
	},
	{
		id: 4,
		title: '포트폴리오04',
		description: '프로젝트 일정을 관리하는 노션 보드입니다.',
		type: 'apps',
		link: '#',
		video: 'https://www.youtube.com/embed/vmL-XgxwQZU?si=gcctn4yt752_3s0m',
		image: '/m/a/thumbnail.png'
	},
	{
		id: 5,
		title: '포트폴리오05',
		description: '프로젝트 일정을 관리하는 노션 보드입니다.',
		type: 'apps',
		link: '#',
		video: 'https://www.youtube.com/embed/vmL-XgxwQZU?si=gcctn4yt752_3s0m',
		image: '/m/a/thumbnail.png'
	},
	{
		id: 6,
		title: '포트폴리오06',
		description: '프로젝트 일정을 관리하는 노션 보드입니다.',
		type: 'apps',
		link: '#',
		video: 'https://www.youtube.com/embed/vmL-XgxwQZU?si=gcctn4yt752_3s0m',
		image: '/m/a/thumbnail.png'
	}
];

// classes
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class FooterComponent extends HTMLElement
{
	constructor()
	{
		super();
		this.init();
	}

	async init()
	{
		const success = await loadTemplate('footer', 'footer', this)
		if(!success) return;

		this.querySelector('#github').addEventListener('click', () => window.open('https://github.com/nogglee', '_blank'));
		this.querySelector('#velog').addEventListener('click', () => window.open('https://velog.io/@nogglee/posts', '_blank'));
		this.querySelector('#email').addEventListener('click', () => window.location.href = 'mailto:pm@nogglee.com?subject=문의&body=협업은 언제든지 환영합니다! 문의할 내용을 작성해 주세요.');
	}
}
customElements.define('footer-component', FooterComponent);

class HeaderComponent extends HTMLElement 
{
	constructor() 
	{
		super();
		this.init();
	}
	async init() 
	{
		const success = await loadTemplate('header', 'header', this);
		if (!success) return;
		
		this.querySelector('#logo').addEventListener('click', () => loadPagePart('landing', document.getElementById('content')));

		this.querySelectorAll('.nav_items').forEach(item => {
			const mainMenu = item.dataset.name;
			if (mainMenu === 'contact') {
				item.addEventListener('click', async () => {
					await loadPagePart('landing', document.getElementById('content'));
					document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
				});
			}
			else if (mainMenu) 
			{
				item.addEventListener('click', async (e) => {
					if (e.target.closest('.sub_nav_items')) return;
					
					await loadPagePart(`${mainMenu}`, document.getElementById('content'));
					if (mainMenu === 'templatelist') 
					{
						const waitForComponent = async () => {
							const component = document.querySelector('template-card-component');
							if (component && typeof component.filterCards === 'function') 
							{
								await component.ready;
								component.filterCards('all');
							}
							else
							{
								setTimeout(waitForComponent, 10);
							}
						};
						waitForComponent();
					}
					else if (mainMenu === 'portfoliolist') {
						const waitForComponent = async () => {
							const component = document.querySelector('portfolio-card-component');
							if (component && typeof component.filterCards === 'function') {
								await component.ready;
								component.filterCards('all');
							}
							else {
								setTimeout(waitForComponent, 10);
							}
						};
						waitForComponent();
					}
				});
			} 
		});

		this.querySelectorAll('.sub_nav_items').forEach(item => {
			const filterType = item.dataset.name;
			if (filterType) 
			{
				item.addEventListener('click', async (e) => {
					const pageType = item.closest('.nav_items').dataset.name;
					if (pageType === 'templatelist') {
						await loadPagePart(pageType, document.getElementById('content'));
						const waitForComponent = async () => {
							const template_component = document.querySelector('template-card-component');
							if (template_component && typeof template_component.filterCards === 'function' && filterType) {
								await template_component.ready;
								template_component.filterCards(filterType);
							}
							else {
								setTimeout(waitForComponent, 10);
							}
						};
						waitForComponent();
					}
					else if (pageType === 'portfoliolist') {
						await loadPagePart(pageType, document.getElementById('content'));
						const waitForComponent = async () => {
							const portfolio_component = document.querySelector('portfolio-card-component');
							if (portfolio_component && typeof portfolio_component.filterCards === 'function' && filterType) {
								await portfolio_component.ready;
								portfolio_component.filterCards(filterType);
							}
							else {
								setTimeout(waitForComponent, 10);
							}
						};
						waitForComponent();
					}
				});
			}
		});
	}
}
customElements.define('header-component', HeaderComponent);

class TemplateCardComponent extends HTMLElement
{
	constructor()
	{
		super();
		this.ready = this.init();
	}
	
	async init() 
	{
		const success = await loadTemplate('templateitem', 'template-card-component', this);
		if (!success) return;

		this.listContainer = this.parentElement;
		const cardTemplate = this.listContainer.querySelector('.template_item');
		this.listContainer.innerHTML = ''
		if (!cardTemplate) return;

		TEMPLATE_DATA.forEach(item => {
			const card = cardTemplate.cloneNode(true);
			card.querySelector('.template_title').textContent = item.title;
			card.querySelector('.template_desc').textContent = item.description;
			card.querySelector('.template_link').href = item.link;
			card.querySelector('iframe').src = item.video;
			card.dataset.type = item.type;
			this.listContainer.appendChild(card);
		});

		this.ownerDocument.querySelectorAll('[data-filter]').forEach(btn => {
			btn.addEventListener('click', () => {
				const filter = btn.dataset.filter;
				this.filterCards(filter);
			});
		});
	
	}
	filterCards(filter) 
	{
		const cards = this.listContainer.querySelectorAll('.template_item');
		cards.forEach(card => {
			const type = card.dataset.type;
			card.style.display = (filter === 'all' || type === filter) ? 'block' : 'none';
		});

		this.ownerDocument.querySelectorAll('[data-filter]').forEach(btn => {
			if (btn.dataset.filter === filter) {
				console.log(btn.dataset.filter);;
				console.log(filter);
				btn.classList.add('active');
			} else {
				btn.classList.remove('active');
			}
		});
	}
}
customElements.define('template-card-component', TemplateCardComponent);

class PortfolioCardComponent extends HTMLElement {
	constructor() {
		super();
		this.ready = this.init();
	}

	async init() {
		const success = await loadTemplate('portfolioitem', 'portfolio-card-component', this);
		if (!success) return;

		this.listContainer = this.parentElement;
		const cardTemplate = this.listContainer.querySelector('.portfolio_item');
		this.listContainer.innerHTML = ''
		if (!cardTemplate) return;

		PORTFOLIO_DATA.forEach(item => {
			const card = cardTemplate.cloneNode(true);
			card.querySelector('.portfolio_title').textContent = item.title;
			card.querySelector('.portfolio_desc').textContent = item.description;
			card.querySelector('.portfolio_link').href = item.link;
			card.dataset.type = item.type;
			this.listContainer.appendChild(card);
		});

		this.ownerDocument.querySelectorAll('[data-filter]').forEach(btn => {
			btn.addEventListener('click', () => {
				const filter = btn.dataset.filter;
				this.filterCards(filter);
			});
		});
	}
	filterCards(filter) {
		if (!this.listContainer) {
			console.warn('listContainer가 설정되지 않았습니다.');
			return;
		}
		const cards = this.listContainer.querySelectorAll('.portfolio_item');
		cards.forEach(card => {
			const type = card.dataset.type;
			card.style.display = (filter === 'all' || type === filter) ? 'block' : 'none';
		});

		this.ownerDocument.querySelectorAll('[data-filter]').forEach(btn => {
			if (btn.dataset.filter === filter) {
				console.log(btn.dataset.filter);
				console.log(filter);
				btn.classList.add('active');
			} else {
				btn.classList.remove('active');
			}
		});
	}
}
customElements.define('portfolio-card-component', PortfolioCardComponent);

// functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function loadPagePart(pagePartName, targetElement) {
	try {
		const html = await (await fetch(`/m/${pagePartName}.html`)).text();
		targetElement.innerHTML = html;
	}
	catch {
		targetElement.innerHTML = `<p style="color:red">${pagePartName} 로딩 실패</p>`;
	}
}

async function loadTemplate(pagePartName, templateId, targetElement) {
	try {
		const html = await (await fetch(`/m/${pagePartName}.html`)).text();

		const container = document.createElement('div');
		container.innerHTML = html;

		const template = container.querySelector(`template#${templateId}`);
		if (template) {
			const clone = template.content.cloneNode(true);
			targetElement.appendChild(clone);
			return true;
		}
		else {
			targetElement.innerHTML = html;
			return false;
		}
	}
	catch {
		targetElement.innerHTML = `<p style="color:red">${pagePartName} 로딩 실패</p>`;
		return false;
	}
}

function renderSelectedPreviews(DATA_NAME, selector, ids) {
	const grid = document.querySelector(selector);
	if (!grid) return;
	grid.innerHTML = '';
	ids.forEach(id => {
		const item = DATA_NAME.find(d => d.id === id);
		if (!item) return;
		const element = document.createElement('div');
		element.className = 'grid_item';
		element.onclick = () => window.open(item.link, '_blank');
		element.innerHTML = `
			<img src="${item.image}" alt="${item.title}" />
			<div class="grid_content">
				<p class="description_sm"><strong>${item.title}</strong></p>
				<p class="caption">${item.description}</p>
			</div>
		`;
		grid.appendChild(element);
	});
}

function sendEmail() {
	const form = document.getElementById('contact_form');
	if (!form) return;

	emailjs.init('YV7YzVSbiOXcul-mG'); // 📌 복사한 public key 사용

	form.addEventListener('submit', function (e) {
		e.preventDefault();

		emailjs.sendForm('service_yjixszn', 'template_44zyocm', this)
			.then(() => {
				alert('문의가 성공적으로 전송되었습니다!');
				form.reset();
			}, (error) => {
				console.error('전송 실패:', error);
				alert('전송 중 오류가 발생했습니다.');
			});
	});
}