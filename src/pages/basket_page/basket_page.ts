import "./basket_page.scss";
import { LineItem } from "@commercetools/platform-sdk";
import Products from "../../controller/products";
import Events from "../../controller/events";
import Carts from "../../controller/carts";

class BasketPage {
  products: Products;
  events: Events;
  carts: Carts;

  constructor() {
    this.products = new Products();
    this.events = new Events();
    this.carts = new Carts();
  }

  async render(): Promise<HTMLElement> {
    const mainWrapper: HTMLElement = document.createElement("div");
    mainWrapper.classList.add("basket");
    const caption: HTMLElement = document.createElement("h2");
    caption.classList.add("basket__caption");
    mainWrapper.innerHTML = "";
    mainWrapper.appendChild(caption);
    caption.innerText = "Basket page";
    if (localStorage.getItem("objectCart")) {
      const cart = JSON.parse(localStorage.getItem("objectCart") as string);
      const productsOnCart = cart.body.lineItems;
      console.log(productsOnCart);
      productsOnCart.forEach((product: LineItem) => {
        const element = this.createProductCard(product);
        this.clickDeleteProduct(mainWrapper, element);
        mainWrapper.append(element);
      });
    }
    return mainWrapper;
  }

  clickDeleteProduct(mainWrapper: HTMLElement, element: HTMLElement) {
    element.addEventListener("click", async (event) => {
      if ((event.target as HTMLElement).tagName === "BUTTON") {
        const lineItemId = element.id;
        this.carts.removeProductOnCart(lineItemId);
        mainWrapper.removeChild(element);
      }
    });
  }

  createProductCard(product: LineItem) {
    const card: HTMLElement = document.createElement("div");
    const title: HTMLElement = document.createElement("h2");
    const subtitle: HTMLElement = document.createElement("h4");
    const image: HTMLElement = document.createElement("div");
    const priceWrapper: HTMLElement = document.createElement("div");
    const firstPriceWrap: HTMLElement = document.createElement("div");
    const price: HTMLElement = document.createElement("h4");
    const toBasket: HTMLButtonElement = document.createElement("button");
    firstPriceWrap.append(price, toBasket);
    card.classList.add("catalog__card");
    card.setAttribute("id", product.id);
    title.classList.add("catalog__card-title");
    subtitle.classList.add("catalog__card-subtitle");
    image.classList.add("catalog__card-img");
    priceWrapper.classList.add("catalog__price-wrapper");
    firstPriceWrap.classList.add("catalog__first-price-wrap");
    price.classList.add("catalog__card-first-price");
    title.innerText = product.name["en-US"];
    toBasket.innerHTML = "X";
    price.innerHTML = `${product.price.value.centAmount / 100}.00`;
    image.style.backgroundImage = `url(${product.variant.images?.[0].url})`;
    priceWrapper.append(firstPriceWrap);
    card.append(title, image, subtitle, priceWrapper);
    return card;
  }
}

export default BasketPage;
