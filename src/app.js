/* eslint-disable import/extensions */
/* eslint-disable no-new */
import Sidebar from './components/Sidebar.js';
import Editor from './components/Editor.js';
import { deleteDocument, generateDocument } from './api/api.js';

export default function App({ $app }) {
  this.state = {
    currentPage: 'home', // 'home' | document.id
  };

  new Sidebar({
    $target: $app,
    onClick: async () => {
      const newDocInfo = await generateDocument(null);
      // 에디터에게 새로운 페이지를 그린다는 것과, 그 id값을 넘겨준다.
      this.setState({ currentPage: newDocInfo.id });
    },
  });

  const editor = new Editor({
    $target: $app,
    initialState: this.state.currentPage,
    onDeleteClick: async () => {
      // 현재의 id에 해당하는 doc을 지우고, state값을 'home'으로 변경한다.
      await deleteDocument(this.state.currentPage);
      this.setState({ currentPage: 'home' });
    },
  });

  this.setState = nextState => {
    this.state = nextState;
    editor.setState(this.state.currentPage);
  };
}
