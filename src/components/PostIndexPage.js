import PostList from './PostList.js';
import { request } from '../api/api.js';
import PostHeader from './PostHeader.js';

export default function PostIndexPage({ $target, route }) {
	const $postsPage = document.createElement('section');
	$postsPage.id = 'left';

	new PostHeader({
		$target: $postsPage,
	});

	const postList = new PostList({
		$target: $postsPage,
		initialState: [],
		route,
	});

	const fetchPosts = async () => {
		const posts = await request('/');
		postList.prepend(posts);
	};

	this.render = async () => {
		await fetchPosts();
		$target.prepend($postsPage);
		this.addEvents();
	};

	this.addEvents = () => {
		$postsPage.addEventListener('click', async (event) => {
			const addNewBtn = event.target.closest('.add-new-btn');

			if (addNewBtn) {
				try {
					await request(`/`, { method: 'POST' });
					location.href = '/';
				} catch (error) {
					console.error('새로운 문서가 생성되지 않았습니다.');
				}
			}
		});
	};

	// 사용되지 않는 코드
	// this.route = () => {
	// 	this.setState();
	// };
}
