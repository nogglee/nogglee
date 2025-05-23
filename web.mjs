// exported things
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function Start() 
{
	const ua = navigator.userAgent.toLowerCase();
	const isMobile = /iphone|ipod|android|mobile|mobi/.test(ua);
	const isAlreadyOnM = location.host.startsWith('m.');

	if (isMobile && !isAlreadyOnM) {
		location.replace('https://m.nogglee.com' + location.pathname + location.search + location.hash);
		return;
	}

	if (!document.querySelector('template-modal-component')) {
		const modalComponent = document.createElement('template-modal-component');
		document.body.appendChild(modalComponent);
		await modalComponent.ready;
	}

	if (!document.querySelector('portfolio-modal-component')) {
		const modalComponent = document.createElement('portfolio-modal-component');
		document.body.appendChild(modalComponent);
		await modalComponent.ready;
	}

	const headerSection = document.getElementById('header_section');
	if (headerSection && !headerSection.querySelector('header-component')) {
		const headerEl = document.createElement('header-component');
		headerSection.appendChild(headerEl);
	}

	await loadPagePart('landing', document.getElementById('content'));

	const footerSection = document.getElementById('footer_section');
	if (footerSection && !footerSection.querySelector('footer-component')) {
		const footerEl = document.createElement('footer-component');
		footerSection.appendChild(footerEl);
	}

	await renderSelectedPreviews(TEMPLATE_DATA, '#preview_template .grid', [1, 2, 3], 'template');
	await renderSelectedPreviews(PORTFOLIO_DATA, '#preview_portfolio .grid', [1, 2, 3, 4, 5, 6], 'portfolio');

	const form = document.getElementById('contact_form');
	if (!form) return;

	emailjs.init('YV7YzVSbiOXcul-mG');

	form.addEventListener('submit', function (e) {
		e.preventDefault();

		const submitButton = form.querySelector('button[type="submit"]');
		if (submitButton) {
			submitButton.dataset.originalText = submitButton.textContent;
			submitButton.style.backgroundColor = '#C79800';
			submitButton.textContent = '전송 중...';
			submitButton.style.pointerEvents = 'none';
		}

		emailjs.sendForm(
			'service_yjixszn',
			'template_44zyocm',
			this
		)
			.then(() => {
				navigator.clipboard.writeText(`${form.message.value}`)
				alert('문의해 주셔서 감사합니다.\n빠르게 검토 후 답변 드리겠습니다!');
				form.reset();
			})
			.catch((error) => {
				console.error('전송 실패:', error);
				navigator.clipboard.writeText(`${form.message.value}`).then(() => {
					alert('오류가 발생하여 문의내용을 클립보드에 복사했습니다.\n이메일로 직접 연락 주시면 감사하겠습니다.');
				}).catch(err => {
					console.error('클립보드 복사 실패:', err);
				});
			})
			.finally(() => {
				if (submitButton) {
					submitButton.textContent = submitButton.dataset.originalText;
					submitButton.style.backgroundColor = '#ffc83d';
					submitButton.style.pointerEvents = 'auto';
				}
			});
	});

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
		description: '업무 분배에 최적화된 템플릿입니다.<br>업무 우선순위, 마감일, 진행 현황까지 한눈에 파악할 수 있습니다.',
		content: '<img src="/m/a/t/1-1.png"><strong>업무 영역 뷰</strong><br><ul><li>기획, 개발환경설정, 마케팅, 경영지원 등 업무 영역별로 나뉜 전체 Task를 한눈에 조망할 수 있는 구조입니다.</li><li>Task 우선순위, 상태, 담당자, 일정, 진행률까지 함께 관리됩니다.</li></ul><img src="/m/a/t/1-2.png"><strong>기능 유형 뷰</strong><br><ul><li>기능별 단위(로그인, 게시판, 마이페이지 등)로 Task를 나누어 제품 중심의 개발 흐름을 정리할 수 있는 뷰입니다.</li><li>하나의 기능이 여러 업무 영역에 걸쳐 있을 경우 특히 유용합니다.</li></ul><img src="/m/a/t/1-3.png"><strong>진행현황 뷰</strong><br><ul><li>칸반보드 형식으로 진행현황별 Task를 조회할 수 있습니다.</li></ul><img src="/m/a/t/1-4.png"><strong>타임라인 뷰</strong><br><ul><li>간트차트 형식으로 프로젝트 일정을 시각화할 수 있습니다.</li></ul><br><strong>이런 분께 추천합니다.</strong><br><ul><li>협업 시스템 설계를 처음하는 팀 리더</li><li>기능 단위로 프로젝트를 파악하고 싶은 기획자/PM</li></ul>',
		type: 'notion',
		link: 'https://www.notion.com/ko/templates/pm',
		video: '',
		image: '/m/a/t/1.svg'
	},
	{
		id: 2,
		title: 'PM을 위한 WBS',
		description: '담당자와 상태에 따른 시각적 구분부터 워킹데이 계산까지, 실무에 바로 적용 가능한 WBS입니다.',
		content: '<strong>휴무일 자동 인식 및 컬러 반영</strong><br><ul><li>Google Apps Script를 활용해 주말 및 지정된 휴일을 자동 인식합니다.</li><li>타임라인 상에 휴무일이 시각적으로 구분되도록 설정했습니다.</li></ul><br><strong>시작일 / 종료일 기반 워킹데이 자동 계산</strong><br><ul><li>휴무일을 제외한 작업 기간을 자동 계산합니다.</li></ul><br><strong>실시간 타임라인 생성</strong><br><ul><li>각 작업별 일정이 오른쪽 타임라인에 실시간으로 반영됩니다.</li><li>시각자료를 통해 누구나 한눈에 프로젝트 전체 흐름을 파악할 수 있습니다.</li></ul><br><strong>상태값에 따라 색상 자동 변경</strong><br><ul><li>진행중 / 대기 / 완료 등의 상태에 따라 각 셀의 배경색이 자동으로 변경됩니다.</li></ul><br><strong>업무 뎁스(Level)에 따른 배경색 차등 적용</strong><br><ul><li>상위 Task와 하위 Task가 명확히 구분되도록 배경색을 차등 적용해 구조적 이해를 돕습니다.</li></ul>',
		type: 'sheets',
		link: 'https://docs.google.com/spreadsheets/d/1ceGJy4js9K6_IFYVcwGDFlxyX54nE7afUDcxcG7fneg/edit?usp=sharing',
		video: '',
		image: '/m/a/t/2.svg'
	},
	{
		id: 3,
		title: '스토리보드',
		description: '아이디어를 시각적으로 정리할 수 있는 스토리보드 템플릿입니다. 기획안의 핵심 흐름을 팀과 공유할 수 있습니다.',
		type: 'figma',
		link: 'https://www.figma.com/community/file/1500835421501275212/storybaord',
		video: '',
		image: '/m/a/t/3.svg'
	}
];

const PORTFOLIO_DATA = [
	{
		id: 1,
		title: 'IR 및 제안서 작성',
		description: '시장과 경쟁사를 분석하고, 투자자 관점에서 매력적으로 보이도록 IR 문서를 기획·작성했습니다.',
		content: '첫 줄<br>두 번째 줄<br>세 번째 줄',
		type: 'plans',
		link: 'https://www.notion.com/ko/templates/pm',
		video: '',
		image: '/m/a/p/1.svg'
	},
	{
		id: 2,
		title: '주간보고 시스템 구축',
		description: '담당자가 날짜 계산 없이도 리포트를 작성할 수 있도록 자동화된 주차 계산 로직을 데이터베이스에 적용했습니다.',
		type: 'tools',
		link: '#',
		video: '',
		image: '/m/a/p/2.svg'
	},
	{
		id: 3,
		title: 'POS 시스템 개발',
		description: '상품, 재고, 고객, 매출까지 통합 관리할 수 있는 POS 프로그램을 기획하고 개발했습니다.',
		type: 'apps',
		link: '#',
		video: '',
		image: '/m/a/p/3.svg'
	},
	{
		id: 4,
		title: '노션/구글시트 연동',
		description: '보안 이슈로 인해 노션 사용이 어려운 고객사를 위해, 데이터를 자동 전송하는 구글시트 연동 시스템을 구축했습니다.',
		type: 'tools',
		link: '#',
		video: '',
		image: '/m/a/p/4.svg'
	},
	{
		id: 5,
		title: '사용자 중심 서비스 기획',
		description: '스토리보드와 플로우차트를 기반으로, 사용자 흐름과 기능 정의를 명확히 정리했습니다.',
		type: 'plans',
		link: '#',
		video: '',
		image: '/m/a/p/5.svg'
	},
	{
		id: 6,
		title: '디자인 시스템 구축',
		description: '컴포넌트 중심의 디자인 시스템을 설계하여 개발과 협업 효율을 높였습니다.',
		type: 'plans',
		link: '#',
		video: '',
		image: '/m/a/p/6.svg'
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
		this.querySelector('#email').addEventListener('click', () => window.location.href = 'mailto:dev@nogglee.com?subject=문의&body=협업은 언제든지 환영합니다! 문의할 내용을 작성해 주세요.');
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

class TemplateModalComponent extends HTMLElement {
	constructor() {
		super();
		this.ready = this.init();
	}

	async init() {
		const success = await loadTemplate('templatemodal', 'template-modal-component', this);
		if (!success) return;
		this.modal = this.querySelector('#template_modal');
		this.modal.querySelector('.modal_close').addEventListener('click', () => {
			this.modal.classList.remove('show');
			document.body.style.overflow = '';
		});
		window.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') {
				this.modal?.classList.remove('show');
				document.body.style.overflow = '';
			}
		});
		this.modal.addEventListener('click', (e) => {
			if (e.target === this.modal) {
				this.modal.classList.remove('show');
				document.body.style.overflow = '';
			}
		});
	}

	showModal(item) {
		const modal = this.modal;
		modal.querySelector('#modal_title').textContent = item.title;
		modal.querySelector('#modal_description').innerHTML = item.description;
		modal.querySelector('#modal_link').href = item.link;
		modal.querySelector('#modal_content').innerHTML = item.content ?? '';

		const iframe = modal.querySelector('#modal_video');
		const img = modal.querySelector('#modal_image');

		if (item.video) {
			iframe.src = item.video;
			iframe.style.display = 'block';
		}
		else {
			iframe.src = '';
			iframe.style.display = 'none';
		}

		img.src = item.image;
		img.style.display = item.video ? 'none' : 'block';

		modal.classList.add('show');
		document.body.style.overflow = 'hidden';
	}
}
customElements.define('template-modal-component', TemplateModalComponent);

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

class PortfolioModalComponent extends HTMLElement {
	constructor() {
		super();
		this.ready = this.init();
	}

	async init() {
		const success = await loadTemplate('portfoliomodal', 'portfolio-modal-component', this);
		if (!success) return;
		this.modal = this.querySelector('#portfolio_modal');
		this.modal.querySelector('.modal_close').addEventListener('click', () => {
			this.modal.classList.remove('show');
			document.body.style.overflow = '';
		});
		window.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') {
				this.modal?.classList.remove('show');
				document.body.style.overflow = '';
			}
		});
		this.modal.addEventListener('click', (e) => {
			if (e.target === this.modal) {
				this.modal.classList.remove('show');
				document.body.style.overflow = '';
			}
		});
	}
	showModal(item) {
		const modal = this.modal;
		modal.querySelector('#modal_title').textContent = item.title;
		modal.querySelector('#modal_description').innerHTML = item.description;
		modal.querySelector('#modal_content').innerHTML = item.content ?? '';

		const iframe = modal.querySelector('#modal_video');
		const img = modal.querySelector('#modal_image');

		if (item.video) {
			iframe.src = item.video;
			iframe.style.display = 'block';
		}
		else {
			iframe.src = '';
			iframe.style.display = 'none';
		}

		img.src = item.image;
		img.style.display = item.video ? 'none' : 'block';

		modal.classList.add('show');
		document.body.style.overflow = 'hidden';
	}
}
customElements.define('portfolio-modal-component', PortfolioModalComponent);

// functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function loadPagePart(pagePartName, targetElement, addHistory = true) {
	try {
		const html = await (await fetch(`/m/${pagePartName}.html`)).text();
		targetElement.innerHTML = html;

		if (addHistory) { history.pushState({ page: pagePartName }, '', `#${pagePartName}`); }
	}
	catch {
		targetElement.innerHTML = `<p style="color:red">${pagePartName} 로딩 실패</p>`;
	}
}

window.addEventListener('popstate', async (event) => {
	const state = event.state;
	const content = document.getElementById('content');

	if (state?.page === 'landing') {
		await Start();
	} else if (state?.page) {
		await loadPagePart(state.page, content, false);
	} else {
		await Start();
	}
});

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

function renderSelectedPreviews(DATA_NAME, selector, ids, type = 'template') {
	const grid = document.querySelector(selector);
	if (!grid) return;
	grid.innerHTML = '';
	ids.forEach(id => {
		const item = DATA_NAME.find(d => d.id === id);
		if (!item) return;
		const element = document.createElement('div');
		element.className = 'grid_item';
		element.onclick = async () => {
			const modalComponent = document.querySelector(`${type}-modal-component`);
			if (!modalComponent) return;
			await modalComponent.ready;
			modalComponent.showModal(item);
		};
		element.innerHTML = `
			<div class="grid_item_inner">
				<img src="${item.image}" alt="${item.title}" />
				<div class="grid_content">
					<p class="description_sm"><strong>${item.title}</strong></p>
					<p class="caption">${item.description}</p>
				</div>
			</div>
		`;
		grid.appendChild(element);
	});
}
