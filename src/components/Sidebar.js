export default function Sidebar({ $target, onClick }) {
  // eslint-disable-next-line no-undef
  const $sidebar = document.createElement('aside');
  $sidebar.className = 'sidebar';
  $target.appendChild($sidebar);

  this.render = () => {
    $sidebar.innerHTML = `
      <div class='sidebar-header'> 🖥️ 프룽이의 Notion </div>
      <div class='sidebar-user'> 개인 페이지 </div>
      <button class='sidebar-new-button btn btn-secondary btn-sm'>새로 만들기</button>
    `;

    const $button = $sidebar.querySelector('button.sidebar-new-button');
    $button.addEventListener('click', e => {
      e.preventDefault();
      onClick();
    });
  };
  this.render();
}
