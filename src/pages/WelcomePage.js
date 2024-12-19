import Button from "../components/Button.js";

export default function WelcomePage({ $target, onClick }) {
  const $page = document.createElement("div");
  $page.id = "page";
  $page.style =
    "display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;";

  const logoImage = document.createElement("img");
  const updateLogo = (theme) => {
    logoImage.src = theme === "dark" ? "/src/assets/logoDark.svg" : "/src/assets/logoLight.svg";
  };
  const initialTheme = localStorage.getItem("theme");
  updateLogo(initialTheme);

  logoImage.alt = "Logo";
  logoImage.style = "width: 200px; margin-bottom: 20px;";

  const welcomeText = document.createElement("p");
  welcomeText.textContent = "데브코스 3팀의 노션 페이지입니다! 지금 바로 시작하세요";
  welcomeText.style = "font-size: 18px; margin-bottom: 20px;";

  const startButton = new Button({
    $target: $page,
    initialState: { text: "시작하기" },
    onClick: onClick,
  });

  window.addEventListener('themeChange', (event) => {
    updateLogo(event.detail.theme);
  });

  this.setState = () => {
    this.render();
  };

  this.render = () => {
    $page.appendChild(logoImage);
    $page.appendChild(welcomeText);
    startButton.render();
    $target.appendChild($page);
  };
}





