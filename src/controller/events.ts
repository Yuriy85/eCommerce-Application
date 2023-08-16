import Login from "./login";

class Events {
  login: Login;
  constructor() {
    this.login = new Login();
  }
  clickButtonLogin() {
    const loginBtn: HTMLButtonElement = document.querySelector(
      ".btn-login",
    ) as HTMLButtonElement;
    loginBtn.addEventListener("click", () => {
      this.login.login();
      console.log(loginBtn);
    });
  }
}

export default Events;
