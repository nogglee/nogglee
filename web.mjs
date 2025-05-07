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

class HeaderComponent extends HTMLElement {
	constructor() {
	  super();
	  const template = document.body.querySelector('template#header');
	  if (!template) return;
	  const content = template.content.cloneNode(true);
	  this.attachShadow({ mode: 'open' }).appendChild(content);
	}

	connectedCallback() {
		this.initEvents();
	  }
  
	  initEvents() {
		const shadow = this.shadowRoot;
  
		shadow.querySelectorAll('.nav-items').forEach(item => {
		  item.addEventListener('click', () => {
			const label = item.textContent.trim();
  
			if (label === '소개') loadPage('about');
			else if (label === '템플릿') loadPage('template');
			else if (label === '포트폴리오') loadPage('portfolio');
			else if (label === 'B2B') loadPage('b2b');
		  });
		});
  
		shadow.querySelectorAll('.sub-nav-items').forEach(sub => {
		  sub.addEventListener('click', () => {
			const type = sub.textContent.trim().toLowerCase();
			loadPage(`template?filter=${type}`);
		  });
		});
	  }
  }
  customElements.define('custom-header', HeaderComponent);


export async function loadPage(name) {
	try {
	  const res = await fetch(`/m/${name}.html`);
	  const html = await res.text();
	  document.getElementById('content').innerHTML = html;
	} catch (err) {
	  document.getElementById('content').innerHTML = `<p style="color:red">페이지 로딩 실패: ${name}</p>`;
	}
  }

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

function injectTemplate(html, id) {
	const temp = document.createElement('div');
	temp.innerHTML = html;
	const template = temp.querySelector(`template#${id}`);
	if (template) document.body.appendChild(template);
  }
  
  export async function Start() {
	try {
	  // Fetch header.html, footer.html, and landing.html concurrently
	  const [headerRes, footerRes, landingRes] = await Promise.all([
		fetch('/m/header.html'),
		fetch('/m/footer.html'),
		fetch('/m/landing.html')
	  ]);
  
	  const headerHtml = await headerRes.text();
	  const footerHtml = await footerRes.text();
	  const landingHtml = await landingRes.text();
  
	  // Inject header and footer templates into the body
	  injectTemplate(headerHtml, 'header');
	  injectTemplate(footerHtml, 'footer');
  
	  // Set body innerHTML with custom-header, main content, and custom-footer
	  document.body.innerHTML = `
		<custom-header></custom-header>
		<main id="content">${landingHtml}</main>
		<custom-footer></custom-footer>
	  `;
  
	  // Create and prepend custom-header and append custom-footer elements
	//   const headerElement = document.createElement('custom-header');
	//   const footerElement = document.createElement('custom-footer');
	//   document.body.prepend(headerElement);
	//   document.body.appendChild(footerElement);
  
	} catch (err) {
	  document.body.innerHTML = `<p style="color:red">Landing 페이지를 불러오는 데 실패했습니다.</p>`;
	}
}