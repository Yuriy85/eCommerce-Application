import Login from "./login";
import Checks from "./checks";
import Register from "./register";
import { pagePaths } from "../routes/routes";
import loginImg from "../assets/icons/login.svg";
import { SimpleSlider } from "simple-slider-ts";
import Carts from "./carts";
import { ProductData } from "@commercetools/platform-sdk";
import Products from "../controller/products";

class Events {
  register: Register;
  login: Login;
  checks: Checks;
  carts: Carts;
  products: Products;

  constructor() {
    this.register = new Register();
    this.login = new Login();
    this.checks = new Checks();
    this.carts = new Carts();
    this.products = new Products();
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
    errorArea?: HTMLSpanElement,
    errorText?: string,
  ) {
    select.addEventListener("change", (event) => {
      if (errorArea) {
        (errorArea as HTMLSpanElement).innerText = errorText || "";
      }
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
    card.addEventListener("click", (event) => {
      if ((event.target as HTMLElement).tagName === "BUTTON") {
        (event.target as HTMLButtonElement).disabled = true;
      } else {
        window.location.href = `${pagePaths.detailedPath}?${card.id}`;
      }
    });
  }

  clickToBasketOnDetailedCard(card: HTMLElement): void {
    card.addEventListener("click", async (event) => {
      if ((event.target as HTMLElement).tagName === "BUTTON") {
        (event.target as HTMLButtonElement).disabled = true;
        localStorage.setItem("idCard", JSON.stringify(card.id));
        const cart = await this.carts.getCart();
        const version = cart.body.version;
        const product: ProductData = await this.products.getProductByID(
          localStorage.getItem("idCard")?.slice(1, -1) as string,
        );
        const sku: string = product.masterVariant?.sku as string;
        const cartWithAddProduct = await this.carts.addProductOnCart(
          sku,
          version,
        );
        localStorage.setItem("objectCart", JSON.stringify(cartWithAddProduct));
        const cartProductLength: string = String(
          cartWithAddProduct.body.lineItems.length,
        );
        localStorage.setItem("countProductOnCart", cartProductLength);
        const buttonBasketCount: HTMLElement = document.getElementById(
          "basket-count",
        ) as HTMLElement;
        buttonBasketCount.textContent = cartProductLength;
        window.location.href = pagePaths.basketPath;
      }
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
