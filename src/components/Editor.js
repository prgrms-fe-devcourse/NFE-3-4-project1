export default function Editor({
  $target,
  initialState = {
    id: null,
    title: "",
    content: "",
    documents: [],
    createdAt: "",
    updatedAt: "",
  },
  onEditing,
}) {
  const $editor = document.createElement("div");
  $editor.style = "display:flex; flex-direction:column;";
  $editor.innerHTML = /*html*/ `
  <div class="editor-toolbar">
    <button onclick="execCmd('bold')"><b>B</b></button>
    <button onclick="execCmd('italic')"><i>I</i></button>
    <button onclick="execCmd('underline')"><u>U</u></button>
    <button onclick="execCmd('insertOrderedList')">OL</button>
    <button onclick="execCmd('insertUnorderedList')">UL</button>
    <label for="font-size-picker"><div>Font Size</div></label>
    <select id="font-size-picker">
      <option value="1">8pt</option>
      <option value="2">10pt</option>
      <option value="3">12pt</option>
      <option value="4">14pt</option>
      <option value="5">18pt</option>
      <option value="6">24pt</option>
      <option value="7">36pt</option>
    </select>
    <label for="text-color-picker"><div>Text Color</div></label>
    <select id="text-color-picker">
      <option value="black" style="color: black;">black</option>
      <option value="white" style="color: white;">white</option>
      <option value="red" style="color: red;">Red</option>
      <option value="green" style="color: green;">Green</option>
      <option value="blue" style="color: blue;">Blue</option>
      <option value="yellow" style="color: yellow;">Yellow</option>
      <option value="purple" style="color: purple;">Purple</option>
    </select>
    <label for="highlight-color-picker"><div>Highlight</div></label>
    <select id="highlight-color-picker">
      <option value="none" style="background: none;">None</option>
      <option value="yellow" style="background: yellow;">Yellow</option>
      <option value="lime" style="background: lime;">Lime</option>
      <option value="cyan" style="background: cyan;">Cyan</option>
      <option value="pink" style="background: pink;">Pink</option>
      <option value="lightgrey" style="background: lightgrey;">Grey</option>
    </select>
  </div>
  <input class='editor_title' name="title" type="text" />
  <div class='editor_content' name="content" contentEditable="true" data-placeholder="여기에 내용을 입력해주세요" style="min-height: 200px;padding: 1.7rem;"></div>
`;
  this.state = initialState;
  $target.appendChild($editor);
  let isInit = true;
  // 상태 설정 함수
  this.setState = (nextState) => {
    this.state = nextState;
    if (isInit) {
      this.render();
    }
    isInit = this.state.id !== +location.pathname.split("/")[2];
  };
  // 렌더링 함수
  this.render = () => {
    const richContent = this.state.content || "";
    $editor.querySelector("[name=title]").value = this.state.title;
    $editor.querySelector("[name=content]").innerHTML = richContent;
  };
  this.render();
  // 제목 입력 필드에 이벤트 리스너 추가
  $editor.querySelector("[name=title]").addEventListener("input", (e) => {
    const nextState = {
      ...this.state,
      title: e.target.value,
    };
    this.setState(nextState);
    onEditing(this.state, true);
  });
  const $content = $editor.querySelector(".editor_content");
  // 내용 변경 시 상태 업데이트
  $content.addEventListener("input", (e) => {
    const nextState = {
      ...this.state,
      content: e.target.innerHTML,
    };
    this.setState(nextState);
    onEditing(this.state);
  });
  // Enter 키 눌렀을 때 줄 바꿈 처리
  $content.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // 현재 커서 위치의 부모 요소에서 스타일을 가져옴
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const parentElement = range.startContainer.parentElement;
      const computedStyle = window.getComputedStyle(parentElement);
      // 스타일 복사
      const color = computedStyle.color || "inherit";
      const fontSize = computedStyle.fontSize || "inherit";
      // 새로운 줄을 생성하면서 스타일 복사
      const newLine = document.createElement("div");
      newLine.innerHTML = "<br>";
      newLine.style.color = color;
      newLine.style.fontSize = fontSize;
      // 배경색을 기본값으로 설정 (transparent)
      newLine.style.backgroundColor = "transparent";
      // 새로운 줄을 삽입
      range.deleteContents();
      range.insertNode(newLine);
      range.setStartAfter(newLine);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  });
  // 리치 에디터 명령을 실행하는 함수
  window.execCmd = (command, value = null) => {
    document.execCommand(command, false, value);
    const nextState = {
      ...this.state,
      content: $content.innerHTML,
    };
    this.setState(nextState);
    onEditing(this.state);
  };
  // 색상 피커 이벤트 추가
  const textColorPicker = $editor.querySelector("#text-color-picker");
  const highlightColorPicker = $editor.querySelector("#highlight-color-picker");
  const fontSizePicker = $editor.querySelector("#font-size-picker");
  // 텍스트 색상 변경
  textColorPicker.addEventListener("input", (e) => {
    const color = e.target.value;
    execCmd("foreColor", color);
  });
  // 하이라이트 색상 변경
  highlightColorPicker.addEventListener("input", (e) => {
    const color = e.target.value;
    // 하이라이트 색상 변경 시 "None" 선택일 경우
    if (color === "none") {
      // 배경색을 투명으로 설정
      execCmd("hiliteColor", "transparent");
    } else {
      execCmd("hiliteColor", color);
    }
  });
  // 폰트 크기 변경
  fontSizePicker.addEventListener("change", (e) => {
    const fontSize = e.target.value;
    execCmd("fontSize", fontSize);
  });
}