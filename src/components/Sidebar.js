export default function Sidebar({ $target, onClick }) {
  // eslint-disable-next-line no-undef
  const $sidebar = document.createElement('aside');
  $sidebar.className = 'sidebar';
  $target.appendChild($sidebar);

  this.render = () => {
    $sidebar.innerHTML = `
      <div class='sidebar-header'> 🖥️ 프룽이의 Notion </div>
      <div class='sidebar-user'> 
        <p>개인 페이지</p>
        <button class='sidebar-new-button'> + </button>
      </div>
      `;

    const $button = $sidebar.querySelector('button.sidebar-new-button');
    $button.addEventListener('click', e => {
      e.preventDefault();
      onClick();
    });
  };
  this.render();
}
