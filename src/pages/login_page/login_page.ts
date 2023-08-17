import "./login_page.scss";
import Events from "../../controller/events";
import Checks from "../../controller/checks";

class LoginPage {
  events: Events;
  checks: Checks;
  constructor() {
    this.events = new Events();
    this.checks = new Checks();
  }

  render(): HTMLElement {
    const mainWrapper: HTMLElement = document.createElement("div");
    mainWrapper.classList.add("main__wrapper");

    const caption: HTMLElement = document.createElement("h2");
    caption.classList.add("main__login-caption");
    caption.innerText = "Login page";

    const inputLogEmail: HTMLInputElement = document.createElement("input");
    inputLogEmail.classList.add("input-log-email");
    inputLogEmail.placeholder = "Enter email";

    const emailErrorArea: HTMLElement = document.createElement("span");
    emailErrorArea.classList.add("main__email-error");

    const inputLogPassword: HTMLInputElement = document.createElement("input");
    const inputLogOpenView: HTMLElement = document.createElement("span");
    const passwordWrapper: HTMLElement = document.createElement("div");
    inputLogPassword.classList.add("input-log-password");
    inputLogOpenView.classList.add("main__password-open-view");
    passwordWrapper.classList.add("main__password-wrapper");
    passwordWrapper.append(inputLogPassword, inputLogOpenView);
    inputLogPassword.type = "password";
    inputLogPassword.placeholder = "Enter password";

    const passwordErrorArea: HTMLElement = document.createElement("span");
    passwordErrorArea.classList.add("main__password-error");

    const btnLog: HTMLButtonElement = document.createElement("button");
    btnLog.classList.add("btn-login");
    btnLog.textContent = "Login";

    mainWrapper.innerHTML = "";
    mainWrapper.append(
      caption,
      inputLogEmail,
      emailErrorArea,
      passwordWrapper,
      passwordErrorArea,
      btnLog,
    );

    this.showHidePassword(inputLogOpenView, inputLogPassword);
    this.events.clickButtonLogin(btnLog);
    this.events.inputFilling(inputLogEmail, emailErrorArea, "email");
    this.events.inputFilling(inputLogPassword, passwordErrorArea, "password");

    return mainWrapper;
  }

  showHidePassword(
    inputLogOpenView: HTMLElement,
    inputLogPassword: HTMLInputElement,
  ) {
    inputLogOpenView.addEventListener("click", () => {
      inputLogOpenView.classList.toggle("main__password-open-view-show");
      if (
        inputLogOpenView.classList.contains("main__password-open-view-show")
      ) {
        inputLogPassword.type = "text";
      } else {
        inputLogPassword.type = "password";
      }
    });
  }
}

export default LoginPage;
