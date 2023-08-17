import Login from "./login";
import Checks from "./checks";

class Events {
  login: Login;
  checks: Checks;
  constructor() {
    this.login = new Login();
    this.checks = new Checks();
  }
  clickButtonLogin(loginBtn: HTMLButtonElement) {
    loginBtn.addEventListener("click", () => {
      if (Checks.emailErrorStatus && Checks.passwordErrorStatus) {
        this.login.login();
      }
    });
  }

  inputFilling(
    input: HTMLInputElement,
    area: HTMLElement,
    checkMethod: "email" | "password",
  ) {
    switch (checkMethod) {
      case "email":
        input.addEventListener("input", () => {
          this.checks.printErrors(area, this.checks.checkEmail(input.value));
        });
        break;
      case "password":
        input.addEventListener("input", () => {
          this.checks.printErrors(area, this.checks.checkPassword(input.value));
        });
        break;
      default:
        break;
    }
  }
}

export default Events;
