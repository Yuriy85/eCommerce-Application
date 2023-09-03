import Login from "./login";
import Checks from "./checks";
import Register from "./register";
import { pagePaths } from "../routes/routes";
import loginImg from "../assets/icons/login.svg";
import { SimpleSlider } from "simple-slider-ts";

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

  clickPageAnchor(
    anchor: HTMLElement,
    path: string,
    profileButton?: HTMLElement,
  ) {
    anchor.addEventListener("click", () => {
      if (localStorage.getItem("id") && anchor.innerHTML === "Login") {
        window.location.href = pagePaths.mainPath;
      } else if (localStorage.getItem("id") && anchor.id === "log-btn") {
        localStorage.removeItem("id");
        window.location.href = path;
        const loginImage: HTMLImageElement = document.getElementById(
          "log-img",
        ) as HTMLImageElement;
        const loginTitle: HTMLElement | null =
          document.getElementById("log-title");
        (loginTitle as HTMLElement).innerText = "Login";
        loginImage.src = loginImg;
        profileButton?.classList.add("header__hide-element");
      } else {
        window.location.href = path;
      }
    });
  }

  clickProductCard(card: HTMLElement): void {
    card.addEventListener("click", () => {
      window.location.href = `${pagePaths.detailedPath}?${card.id}`;
    });
  }

  clickToCatalogButton(button: HTMLButtonElement): void {
    button.addEventListener("click", () => {
      window.location.href = pagePaths.catalogPath;
    });
  }

  clickSliderButton(
    btn: HTMLButtonElement,
    slider: SimpleSlider,
    revers: boolean,
    type: "next" | "prev",
  ): void {
    btn.addEventListener("click", () => {
      if (type === "next") {
        if (revers) {
          slider.reverse();
          revers = false;
        }
        slider.next();
      } else {
        slider.reverse();
        slider.next();
      }
      slider.pause();
      btn.disabled = true;
      setTimeout(() => {
        btn.disabled = false;
      }, 1500);
    });
  }
}

export default Events;
