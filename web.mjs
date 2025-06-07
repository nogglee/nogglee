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

	if (!document.querySelector('modal-component')) {
		const modalComponent = document.createElement('modal-component');
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

	await renderSelectedPreviews(TEMPLATE_DATA, '#preview_template .grid', [1, 5, 3], 'template');
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

	document.querySelectorAll('.grid_item_how').forEach((ThisGridItem) => {
		const category = ThisGridItem.dataset.name;
		if (category) {
			ThisGridItem.onclick = async () => {
				await loadPagePart('portfoliolist', document.getElementById('content'));

				const waitForComponent = async () => {
					const component = document.querySelector('card-component');
					if (component && typeof component.filterCards === 'function') {
						await component.ready;
						component.filterCards(category);

						document.querySelectorAll('#filter_menu button').forEach(btn => {
							if (btn.dataset.filter === category) {
								btn.classList.add('active');
							} else {
								btn.classList.remove('active');
							}
						});
					} else {
						setTimeout(waitForComponent, 10);
					}
				};
				waitForComponent();
			};
		}
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
		video: 'https://www.youtube.com/embed/zFiU3F1b85c?si=Ybakcogkv3KVbm3n',
		image: '/m/a/t/1.svg'
	},
	{
		id: 2,
		title: '1인 개발자를 위한 WBS',
		description: '기능 단위 중심의 작업 구분과 실시간 일정 관리까지, 1인 개발자 실무에 바로 적용 가능한 WBS입니다.',
		content: '<img src="/m/a/t/2-1.png"><strong>업무 뎁스(Level)에 따른 배경색 차등 적용</strong><br><ul><li>상위 Task와 하위 Task가 명확히 구분되도록 배경색을 차등 적용해 구조적 이해를 돕습니다.</li></ul><br><strong>기능 중심의 작업 구분</strong><br><ul><li>기능 단위로 태스크를 구분하여 실제 개발 흐름과 일치하도록 설계했습니다.</li></ul><br><strong>휴무일 자동 인식 및 컬러 반영</strong><br><ul><li>Google Apps Script를 활용해 주말 및 지정된 휴일을 자동 인식합니다.</li><li>타임라인 상에 휴무일이 시각적으로 구분되도록 설정했습니다.</li></ul><br><img src="/m/a/t/2-2.png"><strong>시작일 / 종료일 기반 워킹데이 자동 계산</strong><br><ul><li>휴무일을 제외한 작업 기간을 자동 계산합니다.</li></ul><br><strong>실시간 타임라인 생성</strong><br><ul><li>각 작업별 일정이 오른쪽 타임라인에 실시간으로 반영됩니다.</li><li>시각자료를 통해 누구나 한눈에 프로젝트 전체 흐름을 파악할 수 있습니다.</li></ul><br><strong>상태값에 따라 색상 자동 변경</strong><br><ul><li>진행중 / 대기 / 완료 등의 상태에 따라 각 셀의 배경색이 자동으로 변경됩니다.</li></ul><br>',
		type: 'sheets',
		link: 'https://docs.google.com/spreadsheets/d/1icOF5ed8r1VjaVTXaTFqj_M3dyZjgkkPaZRFm0s5ALY/edit?usp=sharing',
		video: 'https://www.youtube.com/embed/8jMIBp5q6_I?si=fz4v-QAY492oBt0n',
		image: '/m/a/t/2.svg'
	},
	{
		id: 3,
		title: '기획자를 위한 스토리보드',
		description: '아이디어를 시각적으로 정리할 수 있는 스토리보드 템플릿입니다. 기획안의 핵심 흐름을 팀과 공유할 수 있습니다.',
		content: '<img src="/m/a/t/3-1.png"><strong>화면 단위 중심의 구조 설계</strong><br><ul><li>각 페이지(SCREEN ID/Path)를 기준으로 기능 흐름을 정의하고,<br>어떤 행동(버튼 클릭 등)이 어떤 화면 이동이나 액션을 유도하는지<br>시각적으로 정리할 수 있습니다.</li></ul><br><strong>Control / Information 별도 정리 구조</strong><br><ul><li>실제 개발이나 디자이너 전달 시 필요한 주요 제어 요소(button, dropdown 등)와<br>그에 대한 Display Condition을 별도로 정의해 커뮤니케이션 오류를 줄여줍니다.</li></ul><br><strong>설명과 인터랙션이 분리된 깔끔한 시각 구성</strong><br><ul><li>흐름을 따라가며 읽듯이 확인할 수 있어,<br>디자이너/개발자/클라이언트 간의 이해 격차를 줄여줍니다.</li></ul>',
		type: 'figma',
		link: 'https://www.figma.com/community/file/1500835421501275212/storybaord',
		video: '',
		image: '/m/a/t/3.svg',
	},
	{
		id: 4,
		title: 'PM을 위한 WBS',
		description: '담당자와 상태에 따른 시각적 구분부터 워킹데이 계산까지, 실무에 바로 적용 가능한 WBS입니다.',
		content: '<img src="/m/a/t/4-1.png"><strong>업무 뎁스(Level)에 따른 배경색 차등 적용</strong><br><ul><li>상위 Task와 하위 Task가 명확히 구분되도록 배경색을 차등 적용해 구조적 이해를 돕습니다.</li></ul><br><strong>휴무일 자동 인식 및 컬러 반영</strong><br><ul><li>Google Apps Script를 활용해 주말 및 지정된 휴일을 자동 인식합니다.</li><li>타임라인 상에 휴무일이 시각적으로 구분되도록 설정했습니다.</li></ul><br><strong>시작일 / 종료일 기반 워킹데이 자동 계산</strong><br><ul><li>휴무일을 제외한 작업 기간을 자동 계산합니다.</li></ul><br><img src="/m/a/t/4-2.png"><strong>실시간 타임라인 생성</strong><br><ul><li>각 작업별 일정이 오른쪽 타임라인에 실시간으로 반영됩니다.</li><li>시각자료를 통해 누구나 한눈에 프로젝트 전체 흐름을 파악할 수 있습니다.</li></ul><br><strong>상태값에 따라 색상 자동 변경</strong><br><ul><li>진행중 / 대기 / 완료 등의 상태에 따라 각 셀의 배경색이 자동으로 변경됩니다.</li></ul><br>',
		type: 'sheets',
		link: 'https://docs.google.com/spreadsheets/d/1ceGJy4js9K6_IFYVcwGDFlxyX54nE7afUDcxcG7fneg/edit?usp=sharing',
		video: 'https://www.youtube.com/embed/8jMIBp5q6_I?si=fz4v-QAY492oBt0n',
		image: '/m/a/t/4.svg'
	},
	{
		id: 5,
		title: '프리랜서를 위한 일과 삶',
		description: '업무와 일상을 통합관리할 수 있는 위클리 플래너 템플릿입니다. 감정, 루틴, 목표까지 함께 관리할 수 있습니다.',
		content: '<i>본 템플릿은 <a href="https://linktr.ee/ohlocy?fbclid=PAQ0xDSwKxJKxleHRuA2FlbQIxMQABp5m1ieHPQU9IL1JYa8aTJ1rhVBFs-VFvrDUkSpzuHmrS4mpiI9dtG0O1ECx9_aem__pWY52q7Yx29pwlwkxTCPg"><b>오롯이 디자인</b></a>과 함께 제작했습니다.</i><br><br><strong>일과 삶, 둘 다 놓치지 않는 위클리 플래너</strong><br>프리랜서 디자이너 로씨의 니즈에서 시작된 이 템플릿은<br>업무와 개인 일정을 한 번에 정리하고 싶은 분들을 위한 맞춤 도구입니다.<br><br><img src="/m/a/t/5-1.png"><strong>장기 목표 메모장</strong><br><ul><li>연간/분기 목표를 자유롭게 작성할 수 있는 공간입니다.</li><li>줄노트, 리스트, 카드 뷰 등 다양한 형태로 관리할 수 있습니다.</li><li>플립시계와 날씨 영역은 원하는 만큼 줄일 수 있습니다.</li></ul><br><img src="/m/a/t/5-2.png"><strong>일과 삶이 분리된 작업 리스트</strong><br><ul><li>업무와 개인 태스크를 나누어 정리할 수 있습니다.</li><li>미완료/완료 항목을 구분하여 해야할 일을 우선적으로 파악할 수 있습니다.</li><li>프로젝트를 태그로 구분할 수 있습니다.</li></ul><strong>주간/월간 캘린더</strong><br><ul><li>드래그 앤 드롭으로 일정 수정 가능합니다.</li><li>이미 완료된 항목들도 완료한 날짜 기준으로 조회할 수 있습니다.</li></ul><br><strong>이런 분께 추천합니다</strong><br><ul><li>할 일뿐 아니라 루틴, 감정, 목표까지 함께 기록하고 싶은 분</li><li>일과 삶을 분리하면서도 한 곳에서 관리하고 싶은 분</li><li>일주일 단위로 리듬을 정비하고 싶은 프리랜서</li></ul>',
		type: 'notion',
		link: 'https://www.notion.com/ko/templates/dm',
		video: '',
		image: '/m/a/t/5.svg'
	}
];

const PORTFOLIO_DATA = [
	{
		id: 1,
		title: 'IR 및 제안서 작성',
		description: '시장과 경쟁사를 분석하고, 투자자 관점에서 매력적으로 보이도록 IR 문서를 기획·작성했습니다.',
		content: '<strong>프로젝트 개요</strong><br>다양한 산업군의 서비스에 대해,<br>투자자 유치 및 신사업 진행을 위한 IR 및 제안서를 직접 기획하고 작성했습니다.<br>아이템의 특성과 전달 대상에 맞춰, 정보의 흐름을 구성하고,<br>시장 분석과 인사이트 도출을 통해 핵심 가치가 잘 드러나도록 문서화했습니다.<br><br><strong>작성한 문서 유형</strong><br><ol><li><b>[ SaaS IR ] 협업툴</b><br><img src="/m/a/p/1-1.png"></li><li><b>[ 산업 특화 IR ] 반려동물 케어 산업 예약 솔루션</b><br><img src="/m/a/p/1-2.png"></li><li><b>[ AI/마케팅 IR ] AI 인플루언서 매칭 서비스</b><br><img src="/m/a/p/1-4.png"></li><li><b>[ 플랫폼 제안서 ] 지식 콘텐츠 판매 플랫폼</b><br><img src="/m/a/p/1-3.png"></li><li><b>[ 플랫폼 제안서 ] 커피챗 기반 커리어 매칭 플랫폼</b><br><img src="/m/a/p/1-5.png"></li></ol><br><strong>적용한 분석 기법</strong><br><ul><li><b>시장 분석 및 구조화</b><ul><li>TAM / SAM / SOM 분석</li><li>산업별 트렌드 및 성장성 도출</li><li>경쟁사 포지션 비교 / 4P 분석</li></ul></li><li><b>문서 기획 및 구성 설계</b><ul><li>슬라이드 톤앤매너 통일</li><li>핵심 가치 명확화 및 메시지 요약</li><li>인포그래픽, 구조도, 시각화 적용</li></ul></li><li><b>비즈니스 모델 설계 보완</b><ul><li>수익모델 제안, GTM 전략 초안 구성</li><li>MVP 범위 정리 및 실행 로드맵 제시</li></ul></li></ul>',
		type: 'plans',
		link: '',
		video: '',
		image: '/m/a/p/1.svg'
	},
	{
		id: 2,
		title: '주간보고 시스템 구축',
		description: '주차 계산 로직을 적용해 반복 업무를 줄이고,<br>누구나 동일한 기준으로 리포트를 작성할 수 있도록 정리했습니다.',
		content: '<strong>프로젝트 개요</strong><br>여러 팀과 사업부에서 각기 다른 형식과 툴로 주간보고를 작성하고 있어<br>대표자 혹은 상위 관리자가 이를 일일이 확인하고 비교하기 어려운 문제를 해결하기 위해<br>표준화와 자동화가 적용된 주간보고 시스템을 구축했습니다.<br><br><img src="/m/a/p/2-2.png"><img src="/m/a/p/2-1.png"><strong>주요 기능</strong><br><ul><li><b>리포트 작성 템플릿 연동</b><br>데이터 베이스에 리포트 형식을 템플릿으로 저장하여,<br>누구나 동일한 형식으로 작성할 수 있습니다.</li><li><b>날짜 기반 주차 자동 산정</b><br>담당자가 날짜만 입력하면 해당 주차를 자동 계산하여 제목 및 필터에 반영합니다.</li><li><b>중앙 집중화된 보기 제공</b><br>관리자는 하나의 Notion 페이지에서 모든 팀의 리포트를 한눈에 확인할 수 있습니다.</li></ul><br><strong>기대 효과</strong><br><ul><li>리포트 작성 시간 단축</li><li>담당자 간 기준 일치로 보고 시점 혼선 제거</li><li>전체 업무 흐름 파악 용이</li></ul>',
		type: 'tools',
		link: '',
		video: '',
		image: '/m/a/p/2.svg'
	},
	{
		id: 3,
		title: 'POS 시스템 개발',
		description: '상품·재고·판매·포인트까지 모두 관리할 수 있는 서버리스 기반 매장 운영 솔루션을 제작했습니다.',
		content: '<strong>프로젝트 개요</strong><br>오프라인 매장에서 사용할 수 있는 웹 기반 POS 시스템을 기획부터 개발까지 진행했습니다.<br>상품 등록부터 판매·재고·매출 관리는 물론 고객별 포인트 적립 및 할인 적용까지 가능합니다.<br><img src="/m/a/p/3-1.png"><img src="/m/a/p/3-2.png"><img src="/m/a/p/3-3.png"><br><strong>주요 기능</strong><br><ul><li><b>상품/재고 관리</b><ul><li>상품별 카테고리 분류</li><li>수량 입력 및 잔여 수량 실시간 반영</li><li>가격 변경 및 옵션 설정 기능</li></ul></li><li><b>판매 관리 (POS 화면)</b><ul><li>상품 선택 기반 자동 합산</li><li>결제수단(카드/현금/포인트) 별 처리</li><li>판매 내역 정리 및 실시간 매출 반영</li></ul></li><li><b>고객 관리</b><ul><li>고객별 포인트 적립</li><li>구매 이력 관리 및 반복 구매 분석</li></ul></li><li><b>포인트 시스템</b><ul><li>결제 시 포인트 사용/적립 기능 포함</li><li>포인트 이력 및 누적/차감 내역 확인 가능</li></ul></li><li><b>상품 관리 인터페이스</b><ul><li>대량 상품 등록 및 수정</li><li>카테고리 드롭다운, 검색 및 정렬 기능</li></ul></li></ul>',
		type: 'apps',
		video: '',
		image: '/m/a/p/3.svg'
	},
	{
		id: 4,
		title: '노션 / 구글시트 연동',
		description: '보안 이슈로 인해 노션 사용이 어려운 고객사를 위해, 데이터를 자동 전송하는 구글시트 연동 시스템을 구축했습니다.',
		content: '<strong>프로젝트 개요</strong><br>내부 보안 정책으로 인해 노션 사용이 어려운 고객사를 위해,<br>노션과 구글시트를 양방향으로 연동하여 입력한 데이터를 기반으로<br>타임라인 생성 자동화 기능까지 구현했습니다.<br><img src="/m/a/p/4-1.png"><img src="/m/a/p/4-2.png"><img src="/m/a/p/4-3.png"><img src="/m/a/p/4-4.png"><br><strong>주요 기능</strong><br><ul><li><b>노션 → 구글시트 데이터 전송</b><br>노션 데이터베이스의 데이터를 추출하여 구글시트에 맞춘 포맷으로 자동 삽입합니다.</li><li><b>구글시트 → 노션 데이터 전송</b><br>구글시트에서 입력한 데이터를 스크립트 실행으로 노션 데이터베이스에 자동 삽입합니다.</li><li><b>타임라인 생성 자동화</b><br>타임라인 생성을 위한 스크립트를 구글시트에 추가하여 자동으로 타임라인을 생성합니다.</li><li><b>특정 시간 자동 업데이트</b><br>특정 시간에 자동으로 노션 데이터베이스의 데이터를 업데이트합니다.</li><li><b>노션 하위 데이터베이스 접근</b><br>API를 사용하여 노션 데이터베이스의 페이지 내부 콘텐츠를 업데이트 할 수 있고,<br>노션 데이터베이스의 하위 페이지를 접근하여 파일 업로드를 실행합니다.</li></ul>',
		type: 'tools',
		video: '',
		image: '/m/a/p/4.svg'
	},
	{
		id: 5,
		title: '마케터를 위한 UTM 빌더 개발',
		description: '마케팅 캠페인을 위한 UTM 파라미터를 쉽게 생성할 수 있도록 UTM 빌더를 구축했습니다.',
		content: '<strong>프로젝트 개요</strong><br>마케팅 캠페인 성과 추적을 위한 UTM 파라미터 생성 과정을<br>누구나 쉽게 입력하고 복사할 수 있는 웹 기반 빌더로 개발했습니다<br>특히 링크를 직접 손으로 수정하던 반복 업무를 줄이고,<br>실수 없는 정형화된 링크 생성이 가능하도록 구현했습니다.<br><img src="/m/a/p/5-1.png"><img src="/m/a/p/5-2.png"><img src="/m/a/p/5-3.png"><br><strong>주요 기능</strong><br><ul><li><b>UTM 파라미터 입력 가이드 제공</b><br>각 필드 옆에 설명 텍스트가 있어 마케팅 지식이 없어도 쉽게 입력 가능합니다.</li><li><b>입력 항목별 실시간 시각화</b><br>source, campaign, content 등 주요 파라미터 기준으로<br>사용자가 입력한 데이터 통계를 차트로 제공합니다.</li><li><b>실시간 링크 생성</b><br>입력 항목이 변경되면 실시간으로 링크가 생성됩니다.</li>',
		type: 'apps',
		link: 'https://urbuild.vercel.app',
		video: '',
		image: '/m/a/p/5.svg'
	},
	{
		id: 6,
		title: '사용자 중심 서비스 기획',
		description: '스토리보드와 플로우차트를 기반으로, 사용자 흐름과 기능 정의를 명확히 정리했습니다.',
		content: '<strong>프로젝트 개요</strong><br>외주 프로젝트와 내부 서비스 개발 모두에서<br>기획자로서 사용자 경험 설계부터 협업, 출시까지 전 과정을 직접 담당했습니다.<br>스토리보드, 플로우차트, 기능 정의서 등을 다양한 형식으로 작성하며<br>디자이너·개발자·클라이언트가 모두 이해할 수 있는 기획서를 만드는 데 집중했습니다.<br><img src="/m/a/p/6-1.png"><img src="/m/a/p/6-2.png"><img src="/m/a/p/6-3.png"><br><strong>주요 역할 및 성과</strong><br><ul><li><b>기획 문서 작성 및 전달 방식</b><ul><li>구글시트, 노션, 피그마 등 툴의 제약 없이 다양한 형식으로 기획서 구성</li><li>개발팀과 원활한 커뮤니케이션을 위해 플로우차트 기반 기능 정의서 제공</li><li>클라이언트 요청사항을 바탕으로 요건 반영 및 수정 이력 관리</li></ul></li><li><b>외주 프로젝트 관리 경험</b><ul><li>클라이언트와의 지속적 소통으로 요구사항 명확화</li><li>디자인 / 개발팀 간 일정 조율 및 이슈 관리</li><li>MVP 범위 설정 및 점진적 기능 확장 설계</li></ul></li><li><b>내부 프로젝트 운영 경험</b><ul><li>일주일에 앱 1개 개발 프로젝트 진행</li><li>팀 디자이너·개발자와 함께 디자인 시스템 구축</li><li>각종 앱 마켓 심사 기준 이해 및 스토어 출시 경험 보유</li></ul></li></ul>',
		type: 'plans',
		link: '',
		video: '',
		image: '/m/a/p/6.svg'
	},
	{
		id: 7,
		title: '디자인 시스템 구축',
		description: '컴포넌트 중심의 디자인 시스템을 설계하여 개발과 협업 효율을 높였습니다.',
		type: 'plans',
		link: '',
		video: '',
		image: '/m/a/p/7.svg'
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
			const filterType = item.dataset.name;
			if (filterType === 'contact') {
				item.addEventListener('click', async () => {
					await Start();
					setTimeout(() => {
						window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
					}, 100);
				});
			}
			else if (filterType) {
				item.addEventListener('click', async (e) => {
					if (e.target.closest('.sub_nav_items')) return;
					const pageType = item.dataset.name;
					await loadPagePart(pageType, document.getElementById('content'));

					const waitForComponent = async () => {
						const component = document.querySelector('card-component');
						if (component && typeof component.filterCards === 'function') {
							await component.ready;
							component.filterCards('all');
						} else {
							setTimeout(waitForComponent, 10);
						}
					};
					waitForComponent();
				});
			}
		});

		this.querySelectorAll('.sub_nav_items').forEach(item => {
			const filterType = item.dataset.name;
			if (filterType) {
				item.addEventListener('click', async () => {
					const pageType = item.closest('.nav_items').dataset.name;
					if (!pageType) return;

					await loadPagePart(pageType, document.getElementById('content'));

					const waitForComponent = async () => {
						const component = document.querySelector('card-component');
						if (component && typeof component.filterCards === 'function') {
							await component.ready;
							component.filterCards(filterType);
						} else {
							setTimeout(waitForComponent, 10);
						}
					};
					waitForComponent();
				});
			}
		});
	}
}
customElements.define('header-component', HeaderComponent);

class CardComponent extends HTMLElement {
	constructor() {
		super();
		this.ready = this.init();
	}

	async init() {
		const success = await loadTemplate('carditem', 'card-component', this);
		if (!success) return;

		this.listContainer = this.parentElement;
		const cardTemplate = this.listContainer.querySelector('.grid_item');
		if (!cardTemplate) return;

		this.listContainer.innerHTML = '';

		const DATA = this.getAttribute('data-type') === 'template' ? TEMPLATE_DATA : PORTFOLIO_DATA;

		DATA.forEach(item => {
			const card = cardTemplate.cloneNode(true);
			card.querySelector('.grid_item_image').src = item.image;
			card.querySelector('.description_sm strong').textContent = item.title;
			card.querySelector('.caption').textContent = item.description;
			card.dataset.type = item.type;
			const originType = this.getAttribute('data-type');
			card.onclick = async () => {
				const modalComponent = document.querySelector('modal-component');
				await modalComponent.ready;
				modalComponent.showModal(item, originType);
			};
			this.listContainer.appendChild(card);
		});

		this.ownerDocument.querySelectorAll('[data-filter]').forEach(btn => {
			btn.addEventListener('click', () => {
				this.filterCards(btn.dataset.filter);
			});
		});
	}

	filterCards(filter) {
		const cards = this.listContainer.querySelectorAll('.grid_item');
		cards.forEach(card => {
			const type = card.dataset.type;
			card.style.display = (filter === 'all' || type === filter) ? 'block' : 'none';
		});
		this.ownerDocument.querySelectorAll('[data-filter]').forEach(btn => {
			btn.classList.toggle('active', btn.dataset.filter === filter);
		});
	}
}
customElements.define('card-component', CardComponent);

class ModalComponent extends HTMLElement {
	constructor() {
		super();
		this.ready = this.init();
	}

	async init() {
		const success = await loadTemplate('modal', 'modal-component', this);
		if (!success) return;
		this.modal = this.querySelector('#modal');
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

	showModal(item, originType) {
		const modal = this.modal;
		modal.querySelector('#modal_title').textContent = item.title;
		modal.querySelector('#modal_description').innerHTML = item.description;
		const link = modal.querySelector('#modal_link');
		if (originType === 'template') {
			link.style.display = 'block';
			link.setAttribute('href', item.link || '#');
			link.textContent = '템플릿 바로가기';
		} else if (originType === 'portfolio') {
			if (item.link) {
				link.style.display = 'block';
				link.setAttribute('href', item.link);
				link.textContent = '서비스 바로가기';
			} else {
				link.style.display = 'none';
				link.textContent = '';
			}
		}
		modal.querySelector('#modal_content').innerHTML = item.content ?? '';

		const iframe = modal.querySelector('#modal_video');
		const img = modal.querySelector('#modal_image');

		if (item.video) {
			iframe.src = item.video;
			iframe.style.display = 'block';
			img.style.display = 'none';
		} else {
			iframe.src = '';
			iframe.style.display = 'none';
			img.src = item.image;
			img.style.display = 'block';
		}

		modal.classList.add('show');
		document.body.style.overflow = 'hidden';
	}
}
customElements.define('modal-component', ModalComponent);

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

function renderSelectedPreviews(DATA_NAME, selector, ids, type) {
	const grid = document.querySelector(selector);
	if (!grid) return;
	grid.innerHTML = '';
	ids.forEach(id => {
		const item = DATA_NAME.find(d => d.id === id);
		if (!item) return;
		const element = document.createElement('div');
		element.className = 'grid_item';
		element.dataset.type = item.type;
		element.onclick = async () => {
			const modalComponent = document.querySelector(`modal-component`);
			if (!modalComponent) return;
			await modalComponent.ready;
			modalComponent.showModal(item, type);
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