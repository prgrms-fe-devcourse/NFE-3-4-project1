import { PostListMiniUl } from './PostListMiniUi.js';

export function PostListUl(state) {
	const $listContainer = document.createElement('ul');
	$listContainer.className = 'top-document';

	$listContainer.innerHTML = state
		.map((e) => {
			const listToggleName = `isOpened-${e.id}`;
			return `
                <div class="top-document-info ${e.id}">
                    <div class="top-document-left ${listToggleName}">
                        <button>
                            <img src="src/public/down_arrow.png" alt="아래 화살표" />
                        </button>
                        <h2>${e.title ?? '제목을 입력해주세요.'}</h2>
                    </div>
                    <div class="top-document-right">
                        <button class="top-document-add-btn">
                            <img src="src/public/plus.png" alt="하위 페이지 추가 버튼" />
                        </button>
                        <button class="top-document-delete-btn">
                            <img src="src/public/trash.png" alt="상위 페이지 삭제 버튼" />
                        </button>
                    </div>
                </div>
                ${
									e.documents.length > 0
										? `<ul class="sub-document">${PostListMiniUl(e.documents)}</ul>`
										: ''
								}
            `;
		})
		.join('');

	return $listContainer.outerHTML;
}
