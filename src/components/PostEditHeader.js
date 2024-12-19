export default function PostEditHeader({ $target, initialState }) {
	const $editHeader = document.createElement('div');
	$editHeader.className = 'document-info-container';
	$target.appendChild($editHeader);

	this.state = initialState;

	this.setState = (nState) => {
		this.state = nState;
		this.render();
	};

	this.render = () => {
		$editHeader.innerHTML = `<h3>${this.state.title ?? '제목을 입력해주세요.'}</h3>
             <div class="btn-container">
                 <button class="save-btn">
                     <img src="src/public/save.png" alt="저장 이미지" />
                     <span>저장</span>
                 </button>
                <button class="delete-btn">
                    <img src="src/public/trash.png" alt="삭제 이미지" />
                    <span>삭제</span>
                </button>
            </div>
						<div class="modal save-modal">
							<span class="circle"></span>
							<span class="modal-text">저장되었습니다.</span>
						</div>
						<div class="modal delete-modal">
							<span class="circle"></span>
							<span class="modal-text">삭제되었습니다.</span>
						</div>
            `;
	};

	this.render();
}
