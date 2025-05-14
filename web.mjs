// exported things
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function Start() 
{
	await loadPagePart('landing', document.getElementById('content'));

	document.querySelectorAll('.cta_button').forEach(



		(ThisButton) => { ThisButton.onclick = () => { window.open('http://pf.kakao.com/_sGhBn/chat', '_blank', 'width=400, height=600') } }


	);
}

// data
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const TEMPLATE_DATA = [
	{
		id: 1,
		title: '플래너',
		description: '시간 관리를 위한 노션 템플릿입니다.',
		type: 'notion',
		link: '#',
		video: 'https://www.youtube.com/embed/vmL-XgxwQZU?si=gcctn4yt752_3s0mm',
		image: '/thumbnail.png'
	},
	{
		id: 2,
		title: '가계부 시트',
		description: '구글시트 기반 가계부 템플릿입니다.',
		type: 'sheets',
		link: '#',
		video: 'https://www.youtube.com/embed/vmL-XgxwQZU?si=gcctn4yt752_3s0m',
		image: '/thumbnail.png'
	},
	{
		id: 3,
		title: '일정 관리 보드',
		description: '프로젝트 일정을 관리하는 노션 보드입니다.',
		type: 'notion',
		link: '#',
		video: 'https://www.youtube.com/embed/vmL-XgxwQZU?si=gcctn4yt752_3s0m',
		image: '/thumbnail.png'
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
			if (mainMenu) 
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
				});
			}
		});

		this.querySelectorAll('.sub_nav_items').forEach(item => {
			const filterType = item.dataset.name;
			if (filterType) 
			{
				item.addEventListener('click', async (e) => {
					
					await loadPagePart('templatelist', document.getElementById('content'));
					
					const waitForComponent = async () => {
						
						const component = document.querySelector('template-card-component');
						if (component && typeof component.filterCards === 'function') 
						{
							await component.ready;
							component.filterCards(filterType);
						} 
					};
					waitForComponent();

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