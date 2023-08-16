import "./login_page.scss";

class LoginPage {
  createInputLogin() {
    const inputLogEmail: HTMLInputElement = document.createElement("input");
    inputLogEmail.classList.add("input-log-email");
    return inputLogEmail;
  }

  createInputPassword() {
    const inputLogPassword: HTMLInputElement = document.createElement("input");
    inputLogPassword.classList.add("input-log-password");
    return inputLogPassword;
  }

  createBtnLogin() {
    const btnLog: HTMLButtonElement = document.createElement("button");
    btnLog.classList.add("btn-login");
    btnLog.textContent = "Login";
    return btnLog;
  }

  render(): HTMLElement {
    const mainWrapper: HTMLElement = document.createElement("div");
    mainWrapper.classList.add("main__wrapper");
    const caption: HTMLElement = document.createElement("h2");
    caption.classList.add("main__login-caption");
    mainWrapper.innerHTML = "";
    mainWrapper.append(
      caption,
      this.createInputLogin(),
      this.createInputPassword(),
      this.createBtnLogin(),
    );
    caption.innerText = "Login page";
    return mainWrapper;
  }
}

export default LoginPage;
