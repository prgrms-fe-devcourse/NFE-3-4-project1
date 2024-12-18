/* eslint-disable import/extensions */
/* eslint-disable no-new */
import Sidebar from './components/Sidebar.js';
import Editor from './components/Editor.js';
import { deleteDocument, generateDocument } from './api/api.js';

export default function App({ $app }) {
  this.state = {
    currentPage: 'home', // 'home' | document.id
  };
  const $path = location.pathname;
  const $query = location.search;

  console.log($path, $query);

  new Sidebar({
    $target: $app,
    onClick: async parent => {
      const parentId = parent === null ? null : parent;
      const newDocInfo = await generateDocument(parentId);
      this.setState({ currentPage: newDocInfo.id });
      history.pushState(
        { pageId: newDocInfo.id },
        null,
        `/documents/${newDocInfo.id}`,
      );
    },
  });

  const editor = new Editor({
    $target: $app,
    initialState: this.state.currentPage,
    onDeleteClick: async () => {
      await deleteDocument(this.state.currentPage);
      this.setState({ currentPage: 'home' });
      history.pushState(null, null, '/');
    },
  });

  this.setState = nextState => {
    this.state = nextState;
    editor.setState(this.state.currentPage); // 상태 변화에 따라 Editor 업데이트
  };
}
