export function PostListMiniUl(documents) {
	return `${documents
		.map((e) => {
			return `
                <li class="sub-document-item active ${e.id}" >
                    <a href="#">
                        <div class="document-icon">
                            <img src="src/public/document.png" alt="문서 아이콘" />
                        </div>
                        <h3>${e.title}</h3>
                    </a>
                </li>
            `;
		})
		.join('')}`;
}
