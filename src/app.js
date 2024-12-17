/* eslint-disable import/extensions */
/* eslint-disable no-new */
import Sidebar from './components/Sidebar.js';
import Editor from './components/Editor.js';

export default function App({ $app }) {
  this.state = {
    currentPage: 'new',
  };

  new Sidebar({
    $target: $app,
    onClick: () => {
      // TODO 서버로 POST 요청을 보낸다.
      this.setState({ currentPage: 'new' });
    },
  });

  const editor = new Editor({
    $target: $app,
    initialState: this.state.currentPage,
  });

  this.setState = nextState => {
    this.state = nextState;
    editor.setState(this.state.currentPage);
  };
}
