import Login from "./login";
import Checks from "./checks";
import Register from "./register";
import { pagePaths } from "../routes/routes";
import loginImg from "../assets/icons/login.svg";
import { SimpleSlider } from "simple-slider-ts";
import Carts from "./carts";
import { Cart, ClientResponse, ProductData } from "@commercetools/platform-sdk";
import Products from "../controller/products";
import hourImg from "../assets/icons/hourglass.svg";
import cartImg from "../assets/icons/basket.svg";
import delCartImg from "../assets/icons/basket-del.svg";
import Header from "../components/ordinary/header/header";

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
    card.addEventListener("click", async (event) => {
      if ((event.target as HTMLButtonElement).tagName === "BUTTON") {
        const clickedButton: HTMLButtonElement =
          event.target as HTMLButtonElement;
        clickedButton.disabled = true;
        clickedButton.style.backgroundImage = `url(${hourImg})`;
        const cart: ClientResponse<Cart> = await this.carts.getCart();
        const version = cart.body.version;
        const product: ProductData = await this.products.getProductByID(
          card.id,
        );
        const sku: string = clickedButton.classList.contains(
          "catalog__third-basket",
        )
          ? (product.variants[1].sku as string)
          : clickedButton.classList.contains("catalog__second-basket")
          ? (product.variants[0].sku as string)
          : (product.masterVariant.sku as string);
        try {
          const cartWithAddProduct = await this.carts.addProductOnCart(
            sku,
            version,
          );
          clickedButton.style.backgroundImage = `url(${cartImg})`;
          const cartProductLength: string = String(
            cartWithAddProduct.body.lineItems.length,
          );
          localStorage.setItem("countProductOnCart", cartProductLength);
          const buttonBasketCount: HTMLElement = document.getElementById(
            "basket-count",
          ) as HTMLElement;
          buttonBasketCount.textContent = cartProductLength;
        } catch {
          window.location.href = pagePaths.catalogPath;
        }
      } else {
        window.location.href = `${pagePaths.detailedPath}?${card.id}`;
      }
    });
  }

  clickDetailCard(card: HTMLElement): void {
    card.addEventListener("click", async (event) => {
      if (
        (event.target as HTMLButtonElement).classList.contains(
          "detail__to-basket-button",
        )
      ) {
        const clickedButton: HTMLButtonElement =
          event.target as HTMLButtonElement;
        const cartsData: ClientResponse<Cart> = await this.carts.getCart();
        let lineItemId = "";
        let isProductInCart = false;
        cartsData.body.lineItems.forEach((item) => {
          if (item.price.id === clickedButton.id) {
            lineItemId = item.id;
            isProductInCart = true;
          }
        });
        if (isProductInCart) {
          try {
            clickedButton.disabled = true;
            clickedButton.style.backgroundImage = `url(${hourImg})`;
            const cartWithRemoveProduct = await this.carts.removeProductOnCart(
              lineItemId,
            );
            clickedButton.title = "Add to cart";
            clickedButton.disabled = false;
            clickedButton.style.backgroundImage = `url(${cartImg})`;
            const cartProductLength: string = String(
              cartWithRemoveProduct.body.lineItems.length,
            );
            localStorage.setItem("countProductOnCart", cartProductLength);
            const buttonBasketCount: HTMLElement = document.getElementById(
              "basket-count",
            ) as HTMLElement;
            buttonBasketCount.textContent = Header.getCountOnBasketIcon(
              localStorage.getItem("countProductOnCart") as string,
            );
          } catch {
            window.location.href = pagePaths.detailedPath;
          }
        } else {
          clickedButton.disabled = true;
          clickedButton.style.backgroundImage = `url(${hourImg})`;
          const version = cartsData.body.version;
          const product: ProductData = await this.products.getProductByID(
            card.id,
          );
          const sku: string = clickedButton.classList.contains(
            "detail__third-basket",
          )
            ? (product.variants[1].sku as string)
            : clickedButton.classList.contains("detail__second-basket")
            ? (product.variants[0].sku as string)
            : (product.masterVariant.sku as string);
          try {
            const cartWithAddProduct = await this.carts.addProductOnCart(
              sku,
              version,
            );
            clickedButton.title = "Remove from cart";
            clickedButton.style.backgroundImage = `url(${delCartImg})`;
            clickedButton.disabled = false;
            const cartProductLength: string = String(
              cartWithAddProduct.body.lineItems.length,
            );
            localStorage.setItem("countProductOnCart", cartProductLength);
            const buttonBasketCount: HTMLElement = document.getElementById(
              "basket-count",
            ) as HTMLElement;
            buttonBasketCount.textContent = cartProductLength;
          } catch {
            window.location.href = `${pagePaths.detailedPath}?${card.id}`;
          }
        }
      }
    });
  }

  clickDeleteProduct(element: HTMLElement) {
    element.addEventListener("click", async (event) => {
      if ((event.target as HTMLElement).tagName === "BUTTON") {
        const lineItemId = element.id;
        try {
          const cartWithRemoveProduct = await this.carts.removeProductOnCart(
            lineItemId,
          );
          const cartProductLength: string = String(
            cartWithRemoveProduct.body.lineItems.length,
          );
          localStorage.setItem("countProductOnCart", cartProductLength);
          const buttonBasketCount: HTMLElement = document.getElementById(
            "basket-count",
          ) as HTMLElement;
          buttonBasketCount.textContent = Header.getCountOnBasketIcon(
            localStorage.getItem("countProductOnCart") as string,
          );
          window.location.href = pagePaths.basketPath;
        } catch {
          window.location.href = pagePaths.basketPath;
        }
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

  changeQtyProducts(element: HTMLElement) {
    element.addEventListener("change", async (event) => {
      const quantity: HTMLInputElement = event.target as HTMLInputElement;
      if (+quantity.value < 1) {
        quantity.value = "1";
      }
      if (+quantity.value > 999) {
        quantity.value = "999";
      }

      quantity.disabled = true;
      await this.carts.changeQtyProductOnCart(element.id, quantity.value);
      quantity.disabled = false;
      window.location.href = pagePaths.basketPath;
    });
  }

  async clearCart(btn: HTMLButtonElement) {
    btn.addEventListener("click", async () => {
      const buttonNameLength = 15;
      if (btn.innerText.length === buttonNameLength) {
        const buttonBasketCount: HTMLElement = document.getElementById(
          "basket-count",
        ) as HTMLElement;

        btn.disabled = true;
        const cart: ClientResponse<Cart> = JSON.parse(
          localStorage.getItem("objectCart") as string,
        );
        for (const item of cart.body.lineItems) {
          const changedCart = await this.carts.removeProductOnCart(item.id);
          localStorage.setItem(
            "countProductOnCart",
            `${changedCart.body.lineItems.length}`,
          );
          buttonBasketCount.textContent = Header.getCountOnBasketIcon(
            localStorage.getItem("countProductOnCart") as string,
          );
        }
        window.location.href = pagePaths.basketPath;
      } else {
        btn.innerText = "Are you sure?";
        let seconds = 4;
        const timer = setInterval(() => {
          btn.innerText = `Press within  ${seconds - 1}s`;
          seconds -= 1;
          if (seconds === 1) {
            clearInterval(timer);
          }
        }, 1000);
        setTimeout(() => {
          btn.innerText = btn.disabled ? "Wait..." : "Remove all";
        }, 4000);
      }
    });
  }

  applyPromo(btn: HTMLButtonElement, promo: HTMLInputElement) {
    btn.addEventListener("click", async () => {
      try {
        await this.carts.addPromoCode(promo.value);
        btn.innerText = "Successful";
        setTimeout(() => {
          window.location.href = pagePaths.basketPath;
        }, 1000);
      } catch {
        btn.innerText = "Unsuccessful";
        setTimeout(() => {
          window.location.href = pagePaths.basketPath;
        }, 1000);
      }
    });
  }
}
export default Events;
