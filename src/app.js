/* eslint-disable import/extensions */
/* eslint-disable no-new */
import Sidebar from './components/Sidebar.js';
import Editor from './components/Editor.js';
import { deleteDocument, generateDocument } from './api/api.js';

export default function App({ $app }) {
  // 초기 상태: URL을 기준으로 설정
  const { pathname } = location;
  const currentPage = pathname.startsWith('/documents/')
    ? pathname.split('/documents/')[1]
    : 'home';

  this.state = {
    currentPage,
  };

  // Sidebar 컴포넌트 생성
  new Sidebar({
    $target: $app,
    onClick: async () => {
      // 새 문서 생성 및 이동
      const newDocInfo = await generateDocument(null);
      this.setState({ currentPage: newDocInfo.id });
      history.pushState(
        { pageId: newDocInfo.id },
        null,
        `/documents/${newDocInfo.id}`,
      );
    },
  });

  // Editor 컴포넌트 생성
  const editor = new Editor({
    $target: $app,
    initialState: this.state.currentPage,
    onDeleteClick: async () => {
      // 문서 삭제 후 홈으로 이동
      await deleteDocument(this.state.currentPage);
      this.setState({ currentPage: 'home' });
      history.pushState(null, null, '/');
    },
  });

  // 상태 업데이트 함수
  this.setState = nextState => {
    this.state = nextState;
    editor.setState(this.state.currentPage); // 상태 변경 시 Editor 업데이트
  };

  // 라우터: URL 변경에 따라 상태 업데이트
  const router = () => {
    const { pathname } = location;
    const currentPage = pathname.startsWith('/documents/')
      ? pathname.split('/documents/')[1]
      : 'home';

    this.setState({ currentPage });
  };

  // 뒤로가기/앞으로가기 이벤트 처리
  window.addEventListener('popstate', router);
}
