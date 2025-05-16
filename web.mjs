// exported things
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function Start() 
{
	await loadPagePart('landing', document.getElementById('content'));
	await renderSelectedPreviews(TEMPLATE_DATA, '#preview_template .grid', [1, 2, 3]);
	await renderSelectedPreviews(PORTFOLIO_DATA, '#preview_portfolio .grid', [1, 2, 3, 4, 5, 6]);

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

	// Re-bind .cta_button click handlers after landing content is loaded

	document.querySelectorAll('.cta_button').forEach((ThisButton) => {
		ThisButton.onclick = () => {
			document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
		};
	});


}

// data
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const TEMPLATE_DATA = [
	{
		id: 1,
		title: 'PM을 위한 프로젝트 관리',
		description: '업무 분배에 최적화된 템플릿입니다. 업무 우선순위, 마감일, 진행 현황까지 한눈에 파악할 수 있습니다.',
		type: 'notion',
		link: 'https://www.notion.com/ko/templates/pm',
		video: 'https://www.youtube.com/embed/vmL-XgxwQZU?si=gcctn4yt752_3s0mm',
		image: '/m/a/t/t_01.svg'
	},
	{
		id: 2,
		title: 'PM을 위한 WBS',
		description: '일정 관리에 최적화된 템플릿입니다. 담당자, 마감일, 진척도를 시각적으로 확인하며 실행 중심의 일정관리가 가능합니다.',
		type: 'sheets',
		link: 'https://docs.google.com/spreadsheets/d/1ceGJy4js9K6_IFYVcwGDFlxyX54nE7afUDcxcG7fneg/edit?usp=sharing',
		video: 'https://www.youtube.com/embed/vmL-XgxwQZU?si=gcctn4yt752_3s0m',
		image: '/m/a/t/t_02.svg'
	},
	{
		id: 3,
		title: '스토리보드',
		description: '아이디어를 시각적으로 정리할 수 있는 스토리보드 템플릿입니다. 기획안의 핵심 흐름을 팀과 공유할 수 있습니다.',
		type: 'figma',
		link: 'https://www.figma.com/community/file/1500835421501275212/storybaord',
		video: 'https://www.youtube.com/embed/vmL-XgxwQZU?si=gcctn4yt752_3s0m',
		image: '/m/a/t/t_03.svg'
	}
];

const PORTFOLIO_DATA = [
	{
		id: 1,
		title: '시장 조사 기반의 IR 문서 작성',
		description: '시장과 경쟁사를 분석하고, 투자자 관점에서 매력적으로 보이도록 IR 문서를 기획·작성했습니다.',
		type: 'plans',
		link: 'https://www.notion.com/ko/templates/pm',
		video: 'https://www.youtube.com/embed/vmL-XgxwQZU?si=gcctn4yt752_3s0mm',
		image: '/m/a/p/p_01.svg'
	},
	{
		id: 2,
		title: '자동화된 주간보고 시스템 구축',
		description: '담당자가 날짜 계산 없이도 리포트를 작성할 수 있도록 자동화된 주차 계산 로직을 데이터베이스에 적용했습니다.',
		type: 'tools',
		link: '#',
		video: 'https://www.youtube.com/embed/vmL-XgxwQZU?si=gcctn4yt752_3s0m',
		image: '/m/a/p/p_02.svg'
	},
	{
		id: 3,
		title: 'POS 시스템 개발',
		description: '상품, 재고, 고객, 매출까지 통합 관리할 수 있는 POS 프로그램을 기획하고 개발했습니다.',
		type: 'apps',
		link: '#',
		video: 'https://www.youtube.com/embed/vmL-XgxwQZU?si=gcctn4yt752_3s0m',
		image: '/m/a/p/p_03.svg'
	},
	{
		id: 4,
		title: '노션 / 구글시트 자동 연동',
		description: '보안 이슈로 인해 노션 사용이 어려운 고객사를 위해, 데이터를 자동 전송하는 구글시트 연동 시스템을 구축했습니다.',
		type: 'tools',
		link: '#',
		video: 'https://www.youtube.com/embed/vmL-XgxwQZU?si=gcctn4yt752_3s0m',
		image: '/m/a/p/p_04.svg'
	},
	{
		id: 5,
		title: '흐름 중심의 서비스 기획',
		description: '스토리보드와 플로우차트를 기반으로, 사용자 흐름과 기능 정의를 명확히 정리했습니다.',
		type: 'plans',
		link: '#',
		video: 'https://www.youtube.com/embed/vmL-XgxwQZU?si=gcctn4yt752_3s0m',
		image: '/m/a/p/p_05.svg'
	},
	{
		id: 6,
		title: '디자인 시스템 구축',
		description: '컴포넌트 중심의 디자인 시스템을 설계하여 개발과 협업 효율을 높였습니다.',
		type: 'plans',
		link: '#',
		video: 'https://www.youtube.com/embed/vmL-XgxwQZU?si=gcctn4yt752_3s0m',
		image: '/m/a/p/p_06.svg'
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
		
		this.querySelector('#logo').addEventListener('click', () => Start());

		this.querySelectorAll('.nav_items').forEach(item => {
			const mainMenu = item.dataset.name;
			if (mainMenu === 'contact') {
				item.addEventListener('click', async () => {
					await Start();
					setTimeout(() => {
						window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
					}, 100);
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