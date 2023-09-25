import "./login_page.scss";
import Events from "../../controller/events";
import Checks from "../../controller/checks";
import { pagePaths } from "../../routes/routes";

class LoginPage {
  events: Events;
  checks: Checks;
  constructor() {
    this.events = new Events();
    this.checks = new Checks();
  }

  render(): HTMLElement {
    const mainWrapper: HTMLElement = document.createElement("div");
    mainWrapper.classList.add("login");

    const caption: HTMLElement = document.createElement("h2");
    caption.classList.add("login__caption");
    caption.innerText = "Login page";

    const inputLogEmail: HTMLInputElement = document.createElement("input");
    inputLogEmail.classList.add("login__input-log-email");
    inputLogEmail.placeholder = "Enter email";

    const emailErrorArea: HTMLElement = document.createElement("span");
    emailErrorArea.classList.add("login__email-error");

    const inputLogPassword: HTMLInputElement = document.createElement("input");
    const inputLogOpenView: HTMLElement = document.createElement("span");
    const passwordWrapper: HTMLElement = document.createElement("div");
    inputLogPassword.classList.add("login__input-log-password");
    inputLogOpenView.classList.add("login__password-open-view");
    passwordWrapper.classList.add("login__password-wrapper");
    passwordWrapper.append(inputLogPassword, inputLogOpenView);
    inputLogPassword.type = "password";
    inputLogPassword.placeholder = "Enter password";

    const passwordErrorArea: HTMLElement = document.createElement("span");
    passwordErrorArea.classList.add("login__password-error");

    const btnLog: HTMLButtonElement = document.createElement("button");
    btnLog.classList.add("login__btn-login");
    btnLog.textContent = "Login";

    const choice: HTMLElement = document.createElement("span");
    choice.classList.add("login__choice");
    choice.innerText = "If you are not registered";

    const loginError: HTMLElement = document.createElement("span");
    loginError.classList.add("login__error");

    const btnRegister: HTMLButtonElement = document.createElement("button");
    btnRegister.classList.add("login__btn-register");
    btnRegister.textContent = "Go to register";

    const anchorToRegister: HTMLAnchorElement = document.createElement("a");
    anchorToRegister.href = pagePaths.registerPath;
    anchorToRegister.append(btnRegister);
    anchorToRegister.classList.add("login__anchor-to-register");

    mainWrapper.innerHTML = "";
    mainWrapper.append(
      caption,
      inputLogEmail,
      emailErrorArea,
      passwordWrapper,
      passwordErrorArea,
      btnLog,
      loginError,
      choice,
      anchorToRegister,
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
  ): void {
    inputLogOpenView.addEventListener("click", () => {
      inputLogOpenView.classList.toggle("login__password-open-view-show");
      if (
        inputLogOpenView.classList.contains("login__password-open-view-show")
      ) {
        inputLogPassword.type = "text";
      } else {
        inputLogPassword.type = "password";
      }
    });
  }
}

export default LoginPage;
