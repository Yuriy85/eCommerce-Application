import "./basket_page.scss";
import { Cart, ClientResponse, LineItem } from "@commercetools/platform-sdk";
import Events from "../../controller/events";
import { pagePaths } from "../../routes/routes";
import emptyCartImg from "../../assets/images/empty-cart.png";

class BasketPage {
  events: Events;

  constructor() {
    this.events = new Events();
  }

  render(): HTMLElement {
    const mainWrapper: HTMLElement = document.createElement("div");
    mainWrapper.classList.add("basket");

    const caption: HTMLElement = document.createElement("h2");
    caption.classList.add("basket__caption");
    caption.innerText = "Basket page";

    const wrapper: HTMLElement = document.createElement("div");
    wrapper.classList.add("basket__wrapper");
    wrapper.style.gap = "0px";

    const leftAsideWrapper: HTMLElement = document.createElement("div");
    leftAsideWrapper.classList.add("basket__left-wrapper");

    const emptyWrapper: HTMLElement = document.createElement("div");
    emptyWrapper.classList.add("basket__empty-wrapper");
    const emptyMassage: HTMLElement = document.createElement("h3");
    emptyMassage.classList.add("basket__empty-massage");
    emptyMassage.innerText = "Basket is Empty, please go to catalog!";
    const emptyImage: HTMLImageElement = document.createElement("img");
    emptyImage.classList.add("basket__empty-image");
    emptyImage.src = emptyCartImg;

    const rightAsideWrapper: HTMLElement = document.createElement("div");
    rightAsideWrapper.classList.add("basket__right-wrapper");

    const toCatalogButton: HTMLElement = document.createElement("button");
    toCatalogButton.classList.add("basket__to-catalog");
    toCatalogButton.innerText = "To Catalog";

    const totalCartWrapper: HTMLElement = document.createElement("div");
    totalCartWrapper.classList.add("basket__total-cart-wrapper");
    const totalPriceCaption: HTMLElement = document.createElement("h2");
    totalPriceCaption.classList.add("basket__total-price-caption");
    totalPriceCaption.innerText = "Total price:";
    const totalPriceValue: HTMLElement = document.createElement("h2");
    totalPriceValue.classList.add("basket__total-price-value");
    const discountValue: HTMLElement = document.createElement("h2");
    discountValue.classList.add("basket__discount-value");
    const clearCartButton: HTMLButtonElement = document.createElement("button");
    clearCartButton.classList.add("basket__clear-cart");
    clearCartButton.innerText = "Remove all";

    const promoCodeWrapper: HTMLElement = document.createElement("div");
    promoCodeWrapper.classList.add("basket__promo-code-wrapper");
    const promoCodeCaption: HTMLElement = document.createElement("h2");
    promoCodeCaption.classList.add("basket__total-price-caption");
    promoCodeCaption.innerText = "Promo code:";
    const promoCodeValue: HTMLInputElement = document.createElement("input");
    promoCodeValue.classList.add("basket__promo-value");
    promoCodeValue.type = "text";
    const promoCodeButton: HTMLButtonElement = document.createElement("button");
    promoCodeButton.classList.add("basket__clear-cart");
    promoCodeButton.innerText = "Apply promo";

    mainWrapper.innerHTML = "";

    mainWrapper.append(caption, wrapper);
    wrapper.append(leftAsideWrapper, rightAsideWrapper);
    leftAsideWrapper.append(emptyWrapper);
    totalCartWrapper.append(
      totalPriceCaption,
      totalPriceValue,
      discountValue,
      clearCartButton,
    );
    promoCodeWrapper.append(promoCodeCaption, promoCodeValue, promoCodeButton);
    emptyWrapper.append(emptyMassage, emptyImage, toCatalogButton);

    if (localStorage.getItem("objectCart")) {
      const cart: ClientResponse<Cart> = JSON.parse(
        localStorage.getItem("objectCart") as string,
      );
      const productsOnCart = cart.body.lineItems;
      if (productsOnCart.length) {
        leftAsideWrapper.innerHTML = "";
        rightAsideWrapper.append(promoCodeWrapper, totalCartWrapper);
        totalPriceValue.innerText = `${(
          cart.body.totalPrice.centAmount / 100
        ).toFixed(2)} ${String.fromCharCode(8364)}`;
        wrapper.style.gap = "20px";
      }
      productsOnCart.forEach((product: LineItem) => {
        const element = this.createProductCard(product);
        leftAsideWrapper.append(element);
      });
      if (
        productsOnCart.some((item) => item.discountedPricePerQuantity.length)
      ) {
        const discount =
          productsOnCart.reduce(
            (a, v) => a + v.price.value.centAmount * v.quantity,
            0,
          ) - cart.body.totalPrice.centAmount;

        discountValue.innerText = `Saved: ${(discount / 100).toFixed(
          2,
        )} ${String.fromCharCode(8364)}`;
      }
    }

    this.events.clickPageAnchor(toCatalogButton, pagePaths.catalogPath);
    this.events.clearCart(clearCartButton);
    this.events.applyPromo(promoCodeButton, promoCodeValue);

    return mainWrapper;
  }

  createProductCard(product: LineItem) {
    const separator = product.variant.sku?.indexOf("-");

    const card: HTMLElement = document.createElement("div");
    card.classList.add("basket__card");
    card.setAttribute("id", product.id);

    const title: HTMLElement = document.createElement("h2");
    title.classList.add("basket__card-title");
    title.innerText = `${
      product.name["en-US"]
    } ${product.variant.sku?.substring(separator as number)}`;

    const wrapper: HTMLElement = document.createElement("div");
    wrapper.classList.add("basket__card-wrapper");
    const image: HTMLElement = document.createElement("div");
    image.classList.add("basket__card-img");
    image.style.backgroundImage = `url(${product.variant.images?.[0].url})`;
    const price: HTMLElement = document.createElement("h4");
    price.classList.add("basket__card-first-price");
    const quantity: HTMLInputElement = document.createElement("input");
    quantity.classList.add("basket__product-quantity");
    quantity.type = "number";
    quantity.value = `${product.quantity}`;
    quantity.min = "1";
    quantity.max = "999";
    const quantityLabel: HTMLLabelElement = document.createElement("label");
    quantityLabel.classList.add("basket__product-quantity-label");
    quantityLabel.innerText = "QTY: ";

    const totalPrice: HTMLElement = document.createElement("h3");
    totalPrice.classList.add("basket__card-total-price");

    const priceValue = (product.price.value.centAmount / 100).toFixed(2);

    if (product.price.discounted || product.discountedPricePerQuantity[0]) {
      const discountedPriceValue = (
        (product.price.discounted?.value.centAmount ||
          product.discountedPricePerQuantity[0].discountedPrice.value
            .centAmount) / 100
      ).toFixed(2);

      price.classList.add("catalog__card--discount");

      price.innerHTML = `${priceValue.strike()} ${discountedPriceValue} ${String.fromCharCode(
        8364,
      )}`;
      totalPrice.innerHTML = `Total: ${(
        +discountedPriceValue * product.quantity
      ).toFixed(2)} ${String.fromCharCode(8364)}`;
    } else {
      price.innerHTML = `${(product.price.value.centAmount / 100).toFixed(
        2,
      )} ${String.fromCharCode(8364)}`;
      totalPrice.innerHTML = `Total: ${(+priceValue * product.quantity).toFixed(
        2,
      )} ${String.fromCharCode(8364)}`;
    }

    const toBasket: HTMLButtonElement = document.createElement("button");
    toBasket.classList.add("basket__card-remove");
    toBasket.innerHTML = "Remove";

    wrapper.append(image, price, quantityLabel, totalPrice);
    quantityLabel.append(quantity);
    card.append(title, wrapper, toBasket);

    this.events.clickDeleteProduct(card);
    this.events.changeQtyProducts(card);
    return card;
  }
}

export default BasketPage;
