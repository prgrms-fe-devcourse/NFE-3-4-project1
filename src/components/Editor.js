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

  this.render = () => {
    const { document } = this.state || {};
    const { title = '', content = '' } = document || {};
    // $editor.innerHTML = this.state
    if (this.state.currentPage === 'home') {
      $editor.innerHTML = `<div class='editor-form'> Home page</div>`;
    } else {
      if (!isInitialize) {
        $editor.innerHTML = `<div class='editor-form'> 
        <div class='editor-emoji'>📂</div>
        <input id='editor-input' class='editor-input' name='title' placeholder='새 페이지' value='${title}'/>
        <textarea id='editor-textarea' class='editor-textarea' name='content' placeholder='지금 바로 작성을 시작해보세요'>${
          content || '내용을 입력하세요'
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

  setInterval(() => {
    const title = $editor.querySelector('.editor-input').value;
    const content = $editor.querySelector('.editor-textarea').value;

    onEditing({ id: documentId, title, content });
  }, 3000);
}
