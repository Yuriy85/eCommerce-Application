import "./login_page.scss";
import Events from "../../controller/events";

class LoginPage {
  events: Events;
  constructor() {
    this.events = new Events();
  }

  render(): HTMLElement {
    const mainWrapper: HTMLElement = document.createElement("div");
    mainWrapper.classList.add("main__wrapper");

    const caption: HTMLElement = document.createElement("h2");
    caption.classList.add("main__login-caption");
    caption.innerText = "Login page";

    const inputLogEmail: HTMLInputElement = document.createElement("input");
    inputLogEmail.classList.add("input-log-email");

    const inputLogPassword: HTMLInputElement = document.createElement("input");
    inputLogPassword.classList.add("input-log-password");

    const btnLog: HTMLButtonElement = document.createElement("button");
    btnLog.classList.add("btn-login");
    btnLog.textContent = "Login";

    mainWrapper.innerHTML = "";
    mainWrapper.append(caption, inputLogEmail, inputLogPassword, btnLog);

    this.events.clickButtonLogin(btnLog);
    return mainWrapper;
  }
}

export default LoginPage;
