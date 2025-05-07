// // class HeaderComponent extends HTMLElement {
// // 	constructor() {
// // 	  super();
// // 	  const template = document.getElementById('header');
// // 	  const content = template.content.cloneNode(true);
// // 	  this.attachShadow({ mode: 'open' }).appendChild(content);
// // 	}
  
// // 	connectedCallback() {
// // 	  this.initEvents();
// // 	}
  
// // 	// initEvents() {
// // 	//   const shadow = this.shadowRoot;
  
// // 	//   shadow.getElementById('logo')?.addEventListener('click', () => {
// // 	// 	loadPage('landing');
// // 	//   });
  
// // 	//   shadow.querySelectorAll('.nav-items').forEach(item => {
// // 	// 	item.addEventListener('click', () => {
// // 	// 	  const label = item.textContent.trim();
  
// // 	// 	  if (label === '소개') loadPage('about');
// // 	// 	  else if (label === '템플릿') {
// // 	// 		loadPage('template?filter=all').then(() => {
// // 	// 		  if (typeof window.initTemplateModule === 'function') {
// // 	// 			window.initTemplateModule();
// // 	// 		  }
// // 	// 		});
// // 	// 	  }
// // 	// 	  else if (label === '포트폴리오') loadPage('portfolio');
// // 	// 	  else if (label === 'B2B') loadPage('b2b');
// // 	// 	});
// // 	//   });
  
// // 	//   shadow.querySelectorAll('.sub-nav-items').forEach(sub => {
// // 	// 	sub.addEventListener('click', () => {
// // 	// 	  const type = sub.textContent.trim().toLowerCase();
// // 	// 	  loadPage(`template?filter=${type}`).then(() => {
// // 	// 		if (typeof window.initTemplateModule === 'function') {
// // 	// 		  window.initTemplateModule();
// // 	// 		}
// // 	// 	  });
// // 	// 	});
// // 	//   });
// // 	// }
// //   }
// //   customElements.define('custom-header', HeaderComponent);


//   export async function Start() {
// 	try {
// 	  // landing.html과 header.html 병렬로 fetch
// 	  const [landingRes, headerRes] = await Promise.all([
// 		fetch('/m/landing.html'),
// 		fetch('/m/header.html')
// 	  ]);
  
// 	  const landingHtml = await landingRes.text();
// 	  const headerHtml = await headerRes.text();
  
// 	  // landing 먼저 렌더
// 	  document.body.innerHTML = landingHtml;
  
// 	  // header 템플릿 DOM에 주입
// 	  const temp = document.createElement('div');
// 	  temp.innerHTML = headerHtml;
// 	  const headerTemplate = temp.querySelector('template#header');
// 	  if (headerTemplate) {
// 		document.body.appendChild(headerTemplate); // 👈 템플릿 넣고
// 		const header = document.createElement('custom-header'); // 👈 컴포넌트 생성
// 		document.body.prepend(header); // 👈 DOM 삽입
// 	  }
  
// 	} catch (err) {
// 	  document.body.innerHTML = `<p style="color:red">Landing 페이지를 불러오는 데 실패했습니다.</p>`;
// 	}
//   }

// function injectTemplate(html, id) 
// {
// 	const temp = document.createElement('div');
// 	temp.innerHTML = html;
// 	const template = temp.querySelector(`template#${id}`);
// 	if (template) document.body.appendChild(template);
// }

class HeaderComponent extends HTMLElement {
	constructor() 
	{
		super();
		this.init();
	}그

	async init() 
	{
		const success = await loadTemplate('header', 'header', this);
		if (!success) return;

		// this.querySelectorAll('.nav-items').forEach(item => {
		// 	const page = item.dataset.name;
		// 	if (page) item.addEventListener('click', () => loadPage(page));
		// });
	}
}
customElements.define('header-component', HeaderComponent);

export async function loadPage(pageName, targetElement) 
{	
	try 
	{
		const html = await (await fetch(`/m/${pageName}.html`)).text();
		targetElement.innerHTML = html;
	} 
	catch 
	{
		targetElement.innerHTML = `<p style="color:red">${pageName} 로딩 실패</p>`;
	}
}

export async function loadTemplate(pageName, templateId, targetElement)
{
	try
	{
		const html = await (await fetch(`/m/${pageName}.html`)).text();

		const container = document.createElement('div');
		container.innerHTML = html;

		const template = container.querySelector(`template#${templateId}`);
		if (template)
		{
			const clone = template.content.cloneNode(true);
			targetElement.appendChild(clone);
		}
		else
		{
			targetElement.innerHTML = html;
		}
	}
	catch
	{
		targetElement.innerHTML = `<p style="color:red">${pageName} 로딩 실패</p>`;
	}
}

export async function Start() 
{
	await loadPage('landing', document.getElementById('content'));
}