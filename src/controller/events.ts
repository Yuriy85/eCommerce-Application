import Login from "./login";
import Checks from "./checks";
import Register from "./register";

class Events {
  register: Register;
  login: Login;
  checks: Checks;
  constructor() {
    this.register = new Register();
    this.login = new Login();
    this.checks = new Checks();
  }

  clickButtonRegister(registerBtn: HTMLButtonElement) {
    registerBtn.addEventListener("click", () => {
      this.register.registration();
    });
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
