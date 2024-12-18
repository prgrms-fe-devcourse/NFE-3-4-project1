import { getDocuments } from '../api/api.js';

const BASE_URL = '/documents';

export default function Sidebar({ $target, onClick }) {
  // eslint-disable-next-line no-undef
  const $sidebar = document.createElement('aside');
  $sidebar.className = 'sidebar';
  $target.appendChild($sidebar);

  this.render = async () => {
    $sidebar.innerHTML = `
      <div class='sidebar-header'> 🖥️ 프룽이의 Notion </div>
      <div class='sidebar-user'> 
        <p>개인 페이지</p>
        <button class='sidebar-new-button'> + </button>
      </div>
      `;
    const documents = await getDocuments();

    $sidebar.innerHTML += render(documents);

    // 사이드바 : 루트 문서 생성
    const $button = $sidebar.querySelector('button.sidebar-new-button');
    $button.addEventListener('click', e => {
      e.preventDefault();
      onClick(null);
    });

    // 사이드바 : 하위 문서 생성
    const $documentList = $sidebar.querySelector('.document-list');
    // 이벤트 위임 : 각각의 하위 도큐먼트가 아닌 상위 리스트에 이벤트 핸들러 부착
    $documentList.addEventListener('click', event => {
      const { target } = event;
      if (target.classList.contains('document-plus-button')) {
        console.log(target.dataset);
        const parentId = target.dataset.parentid;
        console.log('이벤트 리스너에서 parentid잘 가쳐오나?', parentId);
        onClick(parentId);
      }
    });
  };
  this.render();
}

function createMainDocument(documents) {
  const temp = documents.map(data => {
    return `
      <div class="main-document" data-id=${data.id} >
        <span class="title" data-parentId=${data.id} onclick="location='${BASE_URL}/${data.id}'">${data.title}</span>
        <button class='document-plus-button' data-parentid=${data.id} >+</button>
        ${createSubDocument(data?.documents)}
      </div>`;
  });
  //console.log('temp: ', temp.join(''));

  return temp.join('');
}

// 하위 문서(서브 문서)들의 HTML을 생성
function createSubDocument(documents) {
  // TODO: sub-document one ...
  const temp = documents.map(data => {
    return `
      <div class="sub-document" data-id=${data.id}" onclick="location='${BASE_URL}/${data.id}'" >
        <span class="sub-doc-title" data-parentId=${data.id} onclick="location='${BASE_URL}/${data.id}'">${data.title}</span>
        <button class='sub-document-plus-button document-plus-button' data-parentid=${data.id} >+</button>
        ${createSubDocument(data?.documents)}
      </div>`;
  });
  return temp.join('');
}

//사이드바의 전체 HTML 구조를 생성
function render(documents) {
  return `
      <div class="document-list">
        ${createMainDocument(documents)}
      <div>
    `;
}
