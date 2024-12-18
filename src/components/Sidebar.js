import { getDocuments } from '../api/api.js';

const BASE_URL = '/NFE-3-4-project1/index.html'

export default function Sidebar({ $target, onClick }) {
  // eslint-disable-next-line no-undef
  const $sidebar = document.createElement('aside');
  $sidebar.className = 'sidebar';
  $target.appendChild($sidebar);

  this.render = async() => {
    $sidebar.innerHTML = `
      <div class='sidebar-header'> 🖥️ 프룽이의 Notion </div>
      <div class='sidebar-user'> 
        <p>개인 페이지</p>
        <button class='sidebar-new-button'> + </button>
      </div>
      `;
      const documents = await getDocuments();

      $sidebar.innerHTML += render(documents);
    const $button = $sidebar.querySelector('button.sidebar-new-button');
    $button.addEventListener('click', e => {
      e.preventDefault();
      onClick();
    });
  };
  this.render();
}

function createMainDocument(documents) {
  const temp = documents.map((data) => {
    return `
      <div class="main-document" data-id=${data.id} onclick="location='${BASE_URL}/${data.id}'">
        <span class="title">${data.title}</span>
        ${createSubDocument(data?.documents)}
      </div>`;
  });
  console.log("temp: ", temp.join(""));

  return temp.join("");
}

// 하위 문서(서브 문서)들의 HTML을 생성
function createSubDocument(documents) {
  // TODO: sub-document one ...
  const temp = documents.map((data) => {
    return `
      <div class="sub-document" data-id=${data.id}" onclick="location='${BASE_URL}/${data.id}'" >
        <span class="title">${data.title}</span>
        ${createSubDocument(data?.documents)}
      </div>`;
  });
  return temp.join("");
}

//사이드바의 전체 HTML 구조를 생성
function render(documents) {
  return `
    <aside class="sidebar">
      <div class="document-list">
        ${createMainDocument(documents)}
      <div>
    </aside>`;
}

