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

  clickCheckboxUnited(
    checkboxUnited: HTMLInputElement,
    sectionShipping: HTMLElement,
    sectionAddressTittle: HTMLElement,
  ) {
    checkboxUnited.addEventListener("click", () => {
      checkboxUnited.checked
        ? (sectionShipping.style.display = "none")
        : (sectionShipping.style.display = "flex");
      checkboxUnited.checked
        ? (sectionAddressTittle.textContent = "Billing and shipping address")
        : (sectionAddressTittle.textContent = "Billing address");
    });
  }

  clickButtonRegister(registerBtn: HTMLButtonElement) {
    registerBtn.addEventListener("click", () => {
      const bothAddressCheckbox: HTMLInputElement = document.querySelector(
        ".register__checkbox-united",
      ) as HTMLInputElement;
      if (
        Checks.emailErrorStatus &&
        Checks.passwordErrorStatus &&
        Checks.nameErrorStatus &&
        Checks.surnameErrorStatus &&
        Checks.billingCityErrorStatus &&
        Checks.dateErrorStatus &&
        Checks.billingStreetErrorStatus &&
        Checks.billingCodeErrorStatus
      ) {
        if (bothAddressCheckbox.checked) {
          this.register.registration();
        } else {
          if (
            Checks.shippingCityErrorStatus &&
            Checks.shippingStreetErrorStatus &&
            Checks.shippingCodeErrorStatus
          ) {
            this.register.registration();
          }
        }
      }
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
    checkMethod:
      | "email"
      | "password"
      | "name"
      | "surname"
      | "billingCity"
      | "shippingCity"
      | "date"
      | "billingStreet"
      | "shippingStreet"
      | "billingCode"
      | "shippingCode",
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
      case "name":
        input.addEventListener("input", () => {
          this.checks.printErrors(
            area,
            this.checks.checkNameSurnameCity(input.value, "Name"),
          );
        });
        break;
      case "surname":
        input.addEventListener("input", () => {
          this.checks.printErrors(
            area,
            this.checks.checkNameSurnameCity(input.value, "Surname"),
          );
        });
        break;
      case "billingCity":
        input.addEventListener("input", () => {
          this.checks.printErrors(
            area,
            this.checks.checkNameSurnameCity(input.value, "Billing city"),
          );
        });
        break;
      case "shippingCity":
        input.addEventListener("input", () => {
          this.checks.printErrors(
            area,
            this.checks.checkNameSurnameCity(input.value, "Shipping city"),
          );
        });
        break;
      case "date":
        input.addEventListener("input", () => {
          this.checks.printErrors(area, this.checks.checkDate(input.value));
        });
        break;
      case "billingStreet":
        input.addEventListener("input", () => {
          this.checks.printErrors(
            area,
            this.checks.checkStreet(input.value, "billing"),
          );
        });
        break;
      case "shippingStreet":
        input.addEventListener("input", () => {
          this.checks.printErrors(
            area,
            this.checks.checkStreet(input.value, "shipping"),
          );
        });
        break;
      case "billingCode":
        input.addEventListener("input", () => {
          this.checks.printErrors(
            area,
            this.checks.checkPostCode(
              input.value,
              "billing",
              Checks.billingCheckCountry,
            ),
          );
        });
        break;
      case "shippingCode":
        input.addEventListener("input", () => {
          this.checks.printErrors(
            area,
            this.checks.checkPostCode(
              input.value,
              "shipping",
              Checks.shippingCheckCountry,
            ),
          );
        });
        break;
      default:
        break;
    }
  }

  selectCountry(
    select: HTMLSelectElement,
    inputCode: HTMLInputElement,
    type: "billing" | "shipping",
  ) {
    select.addEventListener("change", (event) => {
      if (type === "billing") {
        Checks.billingCheckCountry = (event.target as HTMLSelectElement).value;
      }
      if (type === "shipping") {
        Checks.shippingCheckCountry = (event.target as HTMLSelectElement).value;
      }
      inputCode.value = "";
    });
  }
}

export default Events;
