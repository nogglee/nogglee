import { TEMPLATE_DATA } from '/template.js?v=20240508';

export async function Start() 
{
	await loadPagePart('landing', document.getElementById('content'));
}

export async function loadPagePart(pagePartName, targetElement) 
{	
	try 
	{
		const html = await (await fetch(`/m/${pagePartName}.html`)).text();
		targetElement.innerHTML = html;
	} 
	catch 
	{
		targetElement.innerHTML = `<p style="color:red">${pagePartName} 로딩 실패</p>`;
	}
}

export async function loadTemplate(pagePartName, templateId, targetElement)
{
	try
	{
		const html = await (await fetch(`/m/${pagePartName}.html`)).text();

		const container = document.createElement('div');
		container.innerHTML = html;

		const template = container.querySelector(`template#${templateId}`);
		if (template)
		{
			const clone = template.content.cloneNode(true);
			targetElement.appendChild(clone);
			return true;
		}
		else
		{
			targetElement.innerHTML = html;
			return false;
		}
	}
	catch
	{
		targetElement.innerHTML = `<p style="color:red">${pagePartName} 로딩 실패</p>`;
		return false;
	}
}

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

		this.querySelectorAll('.nav-items').forEach(item => {
			const mainMenu = item.dataset.name;
			if (mainMenu) 
			{
				item.addEventListener('click', async (e) => {
					if (e.target.closest('.sub-nav-items')) return;
					
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

		this.querySelectorAll('.sub-nav-items').forEach(item => {
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
		const cardTemplate = this.listContainer.querySelector('.template-item');
		this.listContainer.innerHTML = ''
		if (!cardTemplate) return;

		TEMPLATE_DATA.forEach(item => {
			const card = cardTemplate.cloneNode(true);
			card.querySelector('.template-title').textContent = item.title;
			card.querySelector('.template-desc').textContent = item.description;
			card.querySelector('.template-link').href = item.link;
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
		const cards = this.listContainer.querySelectorAll('.template-item');
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