import { getSelectedDocument } from '../api/api.js';
export default function Editor({
  $target,
  documentId,
  initialState,
  onDeleteClick,
  onEditing,
}) {
  // eslint-disable-next-line no-undef

  const $editor = document.createElement('div');

  // setState 될 때마다 재렌더링 되는 문제 해결을 위한 코드
  let isInitialize = false;

  $target.appendChild($editor);
  $editor.className = 'editor-wrapper';

  this.state = initialState; // 'home' | documentId

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = async () => {
    // console.log(this.state);
    const data = await getSelectedDocument(this.state.currentPage);
    console.log(data);
    const { document } = this.state || {};
    const { title = '', content = '' } = document || {};
    // $editor.innerHTML = this.state
    if (this.state.currentPage === 'home') {
      $editor.innerHTML = `
      <div class="homeEditor-container homeEditor-emoji">
      🤖
      <div class='homeEditor-title'> 데브코스 </div>
      <div class="homeEditor-content">
      내 성장의 눈높이에 맞춘 전문적인 교육을 경험할 수 있는 시간 <br> 
      개발자 커리어는 프로그래머스에서 시작하세요!!
      </div>
      </div>
     `;
    } else {
      if (!isInitialize) {
        $editor.innerHTML = `<div class='editor-form'> 
        <div class='editor-emoji'>📂</div>
        <input id='editor-input' class='editor-input' name='title' placeholder='' value='${data.title ? data.title : '새 페이지'}'/>
        <textarea id='editor-textarea' class='editor-textarea' name='content' placeholder='지금 바로 작성을 시작해보세요'>${
          data.content ? data.content : '내용을 입력하세요'
        }</textarea>
        <button class='editor-delete-button btn btn-danger'>삭제</button>
        </div>`;
        isInitialize = true;
      }

      const $deleteButton = $editor.querySelector('.editor-delete-button');
      $deleteButton.addEventListener('click', () => {
        onDeleteClick();
      });
    }
  };

  this.render();

  // let timer = null;
  // if (timer !== null) {
  //   clearInterval(timer);
  // }
  // timer = setInterval(() => {
  //   const title = $editor.querySelector('.editor-input').value;
  //   const content = $editor.querySelector('.editor-textarea').value;

  //   onEditing({ id: documentId, title, content });
  // }, 3000);

  $editor.addEventListener('keyup', () => {
    const title = $editor.querySelector('.editor-input').value;
    const content = $editor.querySelector('.editor-textarea').value;
    onEditing({ id: documentId, title, content });
  });
}
