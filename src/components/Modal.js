import { push } from "../utils/router.js";

// Modal 컴포넌트를 정의하고 export 합니다.
export default function Modal({ $target, onChangeSearchText }) {
  // 모달을 나타내는 div 요소를 생성하고 ID를 설정합니다.
  const $modal = document.createElement("div");
  $modal.id = "modal";

  // 초기 상태를 설정합니다.
  this.state = { isOpen: false, autoDocuments: [] };

  // 상태를 업데이트하고, 상태가 변경되면 렌더링하는 함수입니다.
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  // 모달의 내부 HTML을 설정합니다. 검색 입력 필드와 자동 완성 목록을 포함합니다.
  $modal.innerHTML = /*html*/ `
    <input id="searchInput" type="text" placeholder="여기에 찾을 문서를 입력하세요" autocomplete="off" />
    <ul style="margin-top: 12px;"></ul>
  `;

  // 모달을 렌더링하는 함수입니다.
  this.render = () => {
    $modal.style = `${this.state.isOpen ? "" : "display:none;"}`;

    // $target에 $modal을 추가합니다.
    if (!$target.contains($modal)) {
      $target.appendChild($modal);
    }
  };

  // 초기 렌더링을 수행합니다.
  this.render();

  // 모달을 열거나 닫는 함수입니다.
  this.toggleOpenModal = () =>
    this.state.isOpen ? this.closeModal() : this.openModal();

  // 모달을 여는 함수입니다.
  this.openModal = () => this.setState({ ...this.state, isOpen: true });

  // 모달을 닫는 함수입니다.
  this.closeModal = () => this.setState({ ...this.state, isOpen: false });

  // 자동 완성 목록을 나타내는 ul 요소를 가져옵니다.
  const $autoDocumentsLists = $modal.querySelector("ul");

  // 검색 입력 필드를 가져옵니다.
  const $input = $modal.querySelector("#searchInput");

  // 입력 필드에 이벤트 리스너를 추가합니다.
  $input.addEventListener("input", () => {
    // onChangeSearchText 함수 호출을 통해 입력 값을 전달하고, 자동 완성 목록을 업데이트합니다.
    const nextAutoDocuments = onChangeSearchText($input.value);
    this.setAutoDocuments(nextAutoDocuments);
  });

  // 자동 완성 목록을 설정하는 함수입니다.
  this.setAutoDocuments = (nextAutoDocuments = []) => {
    const regex = /(?! - ID: )\d+/g;
    this.state.autoDocuments = nextAutoDocuments;

    // 자동 완성 목록을 HTML로 변환하여 설정합니다.
    $autoDocumentsLists.innerHTML = `${this.state.autoDocuments
      .map((title) => {
        const matchId = title.match(regex);

        // 목록 항목을 생성하고 data-documentid 속성을 설정합니다.
        return `<li id='auto_completion_link' data-documentid='${matchId}'>
        ${title}
        </li>`;
      })
      .join("")}`;
  };

  // 모달 영역을 떠날 때 모달을 닫는 이벤트 리스너를 추가합니다.
  $modal.addEventListener("mouseleave", this.closeModal);

  // 자동 완성 목록의 클릭 이벤트를 처리합니다.
  $modal.querySelector("ul").addEventListener("click", (e) => {
    // 모달을 닫습니다.
    this.closeModal();

    // 클릭된 항목의 documentid를 가져와서 해당 문서로 라우팅합니다.
    const { documentid } = e.target.dataset;
    if (documentid !== "null") {
      push(`/documents/${documentid}`);
    }
  });
}
