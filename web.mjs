import { TemplateDatas } from './template.js';

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
			const subMenu = item.dataset.name;
			if (subMenu) {
				item.addEventListener('click', () => {
					console.log('subMenu 클릭됨:', subMenu);
					loadPagePart(`${subMenu}`, document.getElementById('content'));
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
		this.init();
	}
	
	async init() 
	{
		const success = await loadTemplate('templateitem', 'template-card-component', this);
		if (!success) return;

		const cardTemplate = this.querySelector('#template-item');
		const listContainer = this.parentElement;

		if (!cardTemplate || !listContainer) return;

		TemplateDatas.forEach(item => {
			const card = cardTemplate.cloneNode(true);
			card.querySelector('.template-title').textContent = item.title;
			card.querySelector('.template-desc').textContent = item.description;
			card.querySelector('.template-link').href = item.link;
			card.querySelector('iframe').src = item.video;
			listContainer.appendChild(card);
		});
	}
}
customElements.define('template-card-component', TemplateCardComponent);