import { push } from '../utils/router.js';
import Button from './Button.js';

export default function NestedDocuments({
  $target,
  onClickListItemAdd,
  onClickListItemTitle,
}) {
  const $nestedDocuments = document.createElement('div');
  $nestedDocuments.id = 'document_list';
  $target.appendChild($nestedDocuments);

  this.state = [];

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const setIsOpenDocuments = (documents) => {
    return (
      documents.length &&
      documents.map(({ id, title, documents }) => ({
        id,
        title,
        documents: setIsOpenDocuments(documents),
        isOpen: true,
      }))
    );
  };

  this.render = () => {
    const documentsWithStatus = setIsOpenDocuments(this.state);

    $nestedDocuments.innerHTML = /*html*/ `
    ${
      this.state.length > 0
        ? /*html*/ `<div class="document_list-title">
    <span>하위 문서</span>
    </div>`
        : ''
    }
    ${getTreeMarkup(documentsWithStatus)}`;
  };

  const getTreeMarkup = (documents = []) => {
    return documents.length
      ? /*html*/ `
      <ul
      class='document_list_ul'>
      ${documents
        .map(
          ({ id, title, documents, isActive, isOpen }) => /*html*/ `
        <li class='document_list_item' data-id='${id}'>
          <div class='document_list-open_button' data-id='${id}'>
          ${documents.length ? (isOpen ? '📂' : '📁') : '🗒'}
          </div>
          <span data-id='${id}' class='${isActive ? 'active' : ''}'>
          ${title}
          </span>
          <button class='document_list-add_button' data-id='${id}'>
          +
          </button>
        </li>
        ${isOpen ? getTreeMarkup(documents) : ''}`
        )
        .join('')}
      </ul>`
      : '';
  };

  $nestedDocuments.addEventListener('click', async ({ target }) => {
    const { id } = target.dataset;
    // "하위 문서" 제목 클릭을 무시하도록 조건 추가
    if (target.closest('.document_list-title')) {
      return; // "하위 문서" 제목에서는 클릭 이벤트 무시
    }
    switch (target.tagName) {
      case 'BUTTON':
        onClickListItemAdd(id);
        break;
      case 'LI':
      case 'SPAN':
      case 'DIV':
        if (id) {
          onClickListItemTitle(id);
        }
        break;
      default:
        break;
    }
  });
}
