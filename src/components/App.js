import PostIndexPage from './PostIndexPage.js';
import PostEditPage from './PostEditPage.js';
import { request } from '../api/api.js';

export default function App({ $target }) {
	this.route = async (parent) => {
		const { pathname } = window.location;
		if (pathname === '/') {
			// removeDiv(".edit-page");
			// mainPage.render();
		} else {
			// removeDiv(".main-page");
			const [, id] = pathname.split('/');
			postEditPage.setState({
				documentId: id,
				parentId: parent,
			});
		}
	};

	const postIndexPage = new PostIndexPage({
		$target,
		route: this.route,
	});

	this.render = () => {
		postIndexPage.render();
	};

	this.render();

	const postEditPage = new PostEditPage({
		$target,
		initialState: {
			documentId: null,
			title: '시작 페이지',
			content: '새로운 문서를 작성해보세요!',
			document: [],
		},
		route: this.route,
	});
}
