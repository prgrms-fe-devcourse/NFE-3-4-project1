export default function Editor({ $target, initialState }) {
  // eslint-disable-next-line no-undef
  const $editor = document.createElement('div');
  $target.appendChild($editor);
  $editor.className = 'editor-wrapper';

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    if (this.state === 'home') {
      $editor.innerHTML = `<div class='editor-form'> Home page</div>`;
    } else if (this.state === 'new') {
      $editor.innerHTML = `<div class='editor-form'> 
        <div class='editor-emoji'>📂</div>
        <input class='editor-input' value='시작하기'/>
        <textarea class='editor-textarea' placeholder='지금 바로 작성을 시작해보세요'></textarea>
        <button class='editor-delete-button btn btn-danger'>삭제</button>
      </div>`;
    }
  };

  this.render();
}
