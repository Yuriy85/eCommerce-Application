class Checks {
  static billingCheckCountry: string;
  static shippingCheckCountry: string;
  static emailErrorStatus: boolean;
  static passwordErrorStatus: boolean;
  static nameErrorStatus: boolean;
  static surnameErrorStatus: boolean;
  static billingCityErrorStatus: boolean;
  static shippingCityErrorStatus: boolean;
  static dateErrorStatus: boolean;
  static billingStreetErrorStatus: boolean;
  static shippingStreetErrorStatus: boolean;
  static billingCodeErrorStatus: boolean;
  static shippingCodeErrorStatus: boolean;

  constructor() {
    Checks.billingCheckCountry = "";
    Checks.shippingCheckCountry = "";
    Checks.emailErrorStatus = false;
    Checks.passwordErrorStatus = false;
    Checks.nameErrorStatus = false;
    Checks.surnameErrorStatus = false;
    Checks.billingCityErrorStatus = false;
    Checks.shippingCityErrorStatus = false;
    Checks.dateErrorStatus = false;
    Checks.billingStreetErrorStatus = false;
    Checks.shippingStreetErrorStatus = false;
    Checks.billingCodeErrorStatus = false;
    Checks.shippingCodeErrorStatus = false;
  }

  checkEmail(email: string): true | string {
    const testEmailChars: RegExp =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (email.slice(0, 1) === " " || email.slice(-1) === " ") {
      Checks.emailErrorStatus = false;
      return "Email address must not contain leading or trailing whitespace.";
    }
    if (
      testEmailChars.test(String(email).toLowerCase()) &&
      !email.includes(" ")
    ) {
      Checks.emailErrorStatus = true;
      return true;
    } else {
      Checks.emailErrorStatus = false;
      return "Email: A properly formatted email address (e.g., example@email.com)!";
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
      password.length >= minPasswordLength &&
      !password.includes(" ")
    ) {
      Checks.passwordErrorStatus = true;
      return true;
    } else {
      Checks.passwordErrorStatus = false;
      return "Password: Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number!";
    }
  }

  checkNameSurnameCity(
    word: string,
    type: "Name" | "Surname" | "Billing city" | "Shipping city",
  ): true | string {
    const symbols: RegExp = /[!"№;%:?*()~`"'@#$%^&*-=+]/g;
    const numbers: RegExp = /[0-9]/g;
    const minWordLength: number = 1;

    if (word.slice(0, 1) === " " || word.slice(-1) === " ") {
      switch (type) {
        case "Name":
          Checks.nameErrorStatus = false;
          break;
        case "Surname":
          Checks.surnameErrorStatus = false;
          break;
        case "Billing city":
          Checks.billingCityErrorStatus = false;
          break;
        case "Shipping city":
          Checks.shippingCityErrorStatus = false;
          break;
      }
      return `${type} must not contain leading or trailing whitespace.`;
    }
    if (
      !word.match(symbols) &&
      !word.match(numbers) &&
      word.length >= minWordLength
    ) {
      switch (type) {
        case "Name":
          Checks.nameErrorStatus = true;
          break;
        case "Surname":
          Checks.surnameErrorStatus = true;
          break;
        case "Billing city":
          Checks.billingCityErrorStatus = true;
          break;
        case "Shipping city":
          Checks.shippingCityErrorStatus = true;
          break;
      }
      return true;
    } else {
      switch (type) {
        case "Name":
          Checks.nameErrorStatus = false;
          break;
        case "Surname":
          Checks.surnameErrorStatus = false;
          break;
        case "Billing city":
          Checks.billingCityErrorStatus = false;
          break;
        case "Shipping city":
          Checks.shippingCityErrorStatus = false;
          break;
      }
      return `${type}: Must contain at least one character and no special characters or numbers!`;
    }
  }

  checkStreet(word: string, type: "billing" | "shipping"): true | string {
    const minWordLength: number = 1;

    if (word.slice(0, 1) === " " || word.slice(-1) === " ") {
      switch (type) {
        case "billing":
          Checks.billingStreetErrorStatus = false;
          break;
        case "shipping":
          Checks.shippingStreetErrorStatus = false;
          break;
      }
      return `Street must not contain leading or trailing whitespace.`;
    }

    if (word.length >= minWordLength) {
      switch (type) {
        case "billing":
          Checks.billingStreetErrorStatus = true;
          break;
        case "shipping":
          Checks.shippingStreetErrorStatus = true;
          break;
      }
      return true;
    } else {
      switch (type) {
        case "billing":
          Checks.billingStreetErrorStatus = false;
          break;
        case "shipping":
          Checks.shippingStreetErrorStatus = false;
          break;
      }
      return `Street: Must contain at least one character!`;
    }
  }

  checkPostCode(
    word: string,
    type: "billing" | "shipping",
    country: string,
  ): true | string {
    const numbersLength: number = country === "Italy" ? 5 : 6;
    const numbers: RegExp = /[0-9]/g;

    if (word.slice(0, 1) === " " || word.slice(-1) === " ") {
      switch (type) {
        case "billing":
          Checks.billingStreetErrorStatus = false;
          break;
        case "shipping":
          Checks.shippingStreetErrorStatus = false;
          break;
      }
      return `Post code must not contain leading or trailing whitespace.`;
    }

    if (
      word.length === numbersLength &&
      word.match(numbers) &&
      !word.includes(" ")
    ) {
      switch (type) {
        case "billing":
          Checks.billingCodeErrorStatus = true;
          break;
        case "shipping":
          Checks.shippingCodeErrorStatus = true;
          break;
      }
      return true;
    } else {
      switch (type) {
        case "billing":
          Checks.billingCodeErrorStatus = false;
          break;
        case "shipping":
          Checks.shippingCodeErrorStatus = false;
          break;
      }
      return `Post code: Must follow the format for the country (e.g., 212029 or 00199 for the Belarus and Italy, respectively)!`;
    }
  }

  checkDate(date: string): true | string {
    const currentData = new Date();
    const inputDate = new Date(date);
    const minAge: number = 13;
    currentData.setFullYear(currentData.getFullYear() - minAge);

    if (currentData > inputDate) {
      Checks.dateErrorStatus = true;
      return true;
    } else {
      Checks.dateErrorStatus = false;
      return "Sorry, your age is under thirteen";
    }
  }

  printErrors(area: HTMLElement, error: true | string): HTMLElement {
    if (error === true) {
      area.innerText = "";
    } else {
      area.innerText = error;
    }
    return area;
  }
}

export default Checks;
