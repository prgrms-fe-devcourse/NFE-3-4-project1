export default function Editor({ $target, initialState, onDeleteClick }) {
  // eslint-disable-next-line no-undef
  const $editor = document.createElement('div');
  $target.appendChild($editor);
  $editor.className = 'editor-wrapper';

  this.state = initialState; // 'home' | documentId

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    if (this.state === 'home') {
      $editor.innerHTML = `<div class='editor-form'> Home page</div>`;
    } else {
      $editor.innerHTML = `<div class='editor-form'> 
        <div class='editor-emoji'>📂</div>
        <input class='editor-input' value='시작하기'/>
        <textarea class='editor-textarea' placeholder='지금 바로 작성을 시작해보세요'></textarea>
        <button class='editor-delete-button btn btn-danger'>삭제</button>
      </div>`;

      const $deleteButton = $editor.querySelector('.editor-delete-button');
      $deleteButton.addEventListener('click', () => {
        onDeleteClick();
      });
    }
  };

  this.render();
}
