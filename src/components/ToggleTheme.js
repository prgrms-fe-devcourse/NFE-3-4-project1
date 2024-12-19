// 페이지 로드 시 저장된 테마를 적용하는 함수
export function loadTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  const themeLink = document.getElementById("theme-link");
  themeLink.href = `/${savedTheme}-mode.css`;
}
// 다크 모드와 라이트 모드를 토글하는 함수
export function toggleTheme() {
  const themeLink = document.getElementById("theme-link");
  const currentTheme = themeLink.href.includes("light-mode.css")
    ? "light"
    : "dark";
  const newTheme = currentTheme === "light" ? "dark" : "light";
  themeLink.href = `/${newTheme}-mode.css`;
  localStorage.setItem("theme", newTheme);
}

