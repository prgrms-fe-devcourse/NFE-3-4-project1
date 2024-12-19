// 필요한 모듈을 import 합니다.
import { DocumentList } from "./DocumentList/index.js";
import LogoHomeButton from "./LogoHomeButton.js";
import { push } from "../utils/router.js";
import Button from "./Button.js";
import Modal from "./Modal.js";
import { toggleTheme, loadTheme } from "./ToggleTheme.js";

export default function Navbar({
  $target,
  onClickListItemAdd,
  onClickListItemTitle,
  getIsOpenMap,
  onClickListItemFolderToggle,
  onClickViewAllFolderOpen,
  onFetchSetTrieSearchObject,
  onChangeSearchText,
}) {
  const $navBar = document.createElement("nav");
  $navBar.id = "navigation";
  $navBar.className = "open";
  $navBar.style = `
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 240px;
    color: white;
    transition: opacity 0.3s ease;
    z-index: 1000;
  `;

  //////

  const KEY_IS_OPEN_DOCUMENT_MAP = "is_open_document_map";

  const toggleIsOpenMap = (documentId) => {
    const nextIsOpenMap = getIsOpenMap();
    nextIsOpenMap[documentId] = !nextIsOpenMap[documentId];
    localStorage.setItem(KEY_IS_OPEN_DOCUMENT_MAP, JSON.stringify(nextIsOpenMap));
    this.documentListRender();
  };

  /////

  let isLocked = false;
  let isResizing = false;

  // 잠금 버튼 생성
  const $lockCheckBox = document.createElement("div");
  $lockCheckBox.className = "checkbox";

  const $lockInput = document.createElement("input");
  $lockInput.type = "checkbox";

  const $lockLabel = document.createElement("label");
  // $lockLabel.textContent = "🔒 잠금";

  $lockCheckBox.appendChild($lockInput);
  $lockCheckBox.appendChild($lockLabel);

  $lockInput.addEventListener("click", () => {
    isLocked = !isLocked;
    if (isLocked) {
      $lockInput.setAttribute("checked", "checked");
      $navBar.style.opacity = "1";
    } else {
      $lockInput.removeAttribute("checked");
      $navBar.style.opacity = "0";
    }
  });

  // 드래그 핸들 생성
  const $resizeHandle = document.createElement("div");
  $resizeHandle.style = `
    position: absolute;
    top: 0;
    right: 0;
    width: 10px;
    height: 100%;
    cursor: ew-resize;
    background: rgba(0, 0, 0, 0.1);
  `;
  $navBar.appendChild($resizeHandle);

  // 마우스 이벤트 처리
  $resizeHandle.addEventListener("mousedown", (e) => {
    if (isLocked) {
      isResizing = true;
      document.body.style.cursor = "ew-resize";
      e.preventDefault();
    }
  });

  document.addEventListener("mousemove", (e) => {
    if (isResizing) {
      const newWidth = e.clientX; // 마우스 위치를 기준으로 폭 조절
      if (newWidth >= 200 && newWidth <= 400) { // 최소 및 최대 폭 제한
        $navBar.style.width = `${newWidth}px`;
      }
      e.preventDefault();
    }
  });

  document.addEventListener("mouseup", () => {
    if (isResizing) {
      isResizing = false;
      document.body.style.cursor = "default";
      e.preventDefault();
    }
  });

  $navBar.addEventListener("mouseenter", () => {
    if (!isLocked) {
      $navBar.style.opacity = "1";
    }
  });

  $navBar.addEventListener("mouseleave", () => {
    if (!isLocked) {
      $navBar.style.opacity = "0";
    }
  });

  // 초기 상태로 렌더링
  document.body.appendChild($navBar);
  $navBar.appendChild($lockCheckBox);

  const logo = new LogoHomeButton({
    $target: $navBar,
    onClick: () => {
      activeDocumentId = null;
      this.clearHighlight();
      push("/");
    },
  });

  this.clearHighlight = () => {
    const $highlightedElements = $navBar.querySelectorAll(".document_list_item.highlighted");
    $highlightedElements.forEach((el) => el.classList.remove("highlighted"));
  };

  const $topButtonGroup = document.createElement("div");
  $topButtonGroup.className = "nav-top_button_group";

  const theme = localStorage.getItem("theme");
  const modal = new Modal({
    $target: $navBar,
    onChangeSearchText,
  });

  new Button({
    $target: $topButtonGroup,
    initialState: { text: "🔍 빠른 문서 검색" },
    onClick: modal.toggleOpenModal,
  });

  const lightModeButton = new Button({
    $target: $topButtonGroup,
    initialState: {
      text: theme === "dark" ? "☀️ 라이트모드로 전환" : "🌙 다크모드로 전환",
    },
    onClick: () => {
      toggleTheme();
      const currentTheme = localStorage.getItem("theme");
      lightModeButton.setState({
        text: currentTheme === "dark" ? "☀️ 라이트모드로 전환" : "🌙 다크모드로 전환",
      });
  
      // 테마 전환 CustomEvent 생성
      const themeChangeEvent = new CustomEvent('themeChange', {
        detail: { theme: currentTheme }
      });
      window.dispatchEvent(themeChangeEvent);
    },
  });

  const $bottomButtonGroup = document.createElement("div");
  $bottomButtonGroup.className = "nav-bottom_button_group";

  new Button({
    $target: $bottomButtonGroup,
    initialState: { text: "+ 새 문서 만들기" },
    onClick: onClickListItemAdd,
  });

  let activeDocumentId = null;

  this.setActiveDocument = (documentId) => {
    activeDocumentId = documentId;
    this.render();
  };

  const documentList = new DocumentList({
    $target: $navBar,
    onClickListItemAdd,
    onClickListItemTitle,
    getIsOpenMap,
    onClickListItemFolderToggle,
    onFetchSetTrieSearchObject,
    isOpenAll: false,
  });

  this.setState = (next) => {
    documentList.setState(next);
    this.render();
  };

  this.render = () => {
    $target.appendChild($navBar);
    documentList.render();
    $navBar.prepend($topButtonGroup);
    $navBar.appendChild($bottomButtonGroup);
    logo.render();

    const $highlightedElements = $navBar.querySelectorAll(".document_list_item.highlighted");
    $highlightedElements.forEach((el) => el.classList.remove("highlighted"));

    if (activeDocumentId) {
      const $activeElement = $navBar.querySelector(
        `.document_list_item[data-id='${activeDocumentId}']`
      );
      if ($activeElement) {
        $activeElement.classList.add("highlighted");
      }
    }
  };

  this.documentListFetch = () => documentList.fetch();
  this.documentListRender = () => documentList.render();
  loadTheme();
}

