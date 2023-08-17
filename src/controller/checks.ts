class Checks {
  static emailErrorStatus: boolean;
  static passwordErrorStatus: boolean;
  constructor() {
    Checks.emailErrorStatus = false;
    Checks.passwordErrorStatus = false;
  }

  checkEmail(email: string): true | string {
    const testEmailChars: RegExp =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (email.slice(0, 1) === " " || email.slice(-1) === " ") {
      Checks.emailErrorStatus = false;
      return "Email address must not contain leading or trailing whitespace.";
    }
    if (testEmailChars.test(String(email).toLowerCase())) {
      Checks.emailErrorStatus = true;
      return true;
    } else {
      Checks.emailErrorStatus = false;
      return "Email not valid!";
    }
  }

  checkPassword(password: string): true | string {
    const lowerCaseLetters: RegExp = /[a-z]/g;
    const upperCaseLetters: RegExp = /[A-Z]/g;
    const numbers: RegExp = /[0-9]/g;
    const minPasswordLength: number = 8;

    if (password.slice(0, 1) === " " || password.slice(-1) === " ") {
      Checks.passwordErrorStatus = false;
      return "Password must not contain leading or trailing whitespace.";
    }
    if (
      password.match(lowerCaseLetters) &&
      password.match(upperCaseLetters) &&
      password.match(numbers) &&
      password.length >= minPasswordLength
    ) {
      Checks.passwordErrorStatus = true;
      return true;
    } else {
      Checks.passwordErrorStatus = false;
      return "Password not valid!";
    }
  }

  printErrors(area: HTMLElement, error: true | string): void {
    if (error === true) {
      area.innerText = "";
    } else {
      area.innerText = error;
    }
  }
}

export default Checks;
