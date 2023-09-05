import "./detail_page.scss";
import Events from "../../controller/events";
import Products from "../../controller/products";
import { ProductData, ProductVariant } from "@commercetools/platform-sdk";
import getSlider from "simple-slider-ts";

class DetailPage {
  products: Products;
  events: Events;

  constructor() {
    this.products = new Products();
    this.events = new Events();
  }

  async render(): Promise<HTMLElement> {
    const product: ProductData = await this.products.getProductByID(
      new URL(window.location.href).hash.split("?")[1],
    );

    const mainWrapper: HTMLElement = document.createElement("div");
    mainWrapper.classList.add("detail");
    mainWrapper.innerHTML = "";

    const caption: HTMLElement = document.createElement("h2");
    caption.classList.add("detail__caption");
    caption.innerText = product.name["en-US"];

    const wrapper: HTMLElement = document.createElement("div");
    wrapper.classList.add("detail__wrapper");

    const imageSlider: HTMLElement = document.createElement("div");
    imageSlider.classList.add("detail__image-slider");

    const btnLeft: HTMLButtonElement = document.createElement("button");
    btnLeft.classList.add("detail__left-slider");

    const btnClose: HTMLButtonElement = document.createElement("button");
    btnClose.classList.add("detail__close-modal");

    const btnRight: HTMLButtonElement = document.createElement("button");
    btnRight.classList.add("detail__right-slider");

    const imageButtonWrapper: HTMLElement = document.createElement("div");
    imageButtonWrapper.classList.add("detail__img-button-wrapper");

    const imageWrapper: HTMLElement = document.createElement("div");
    imageWrapper.classList.add("detail__image-wrapper");

    const imageOne: HTMLElement = document.createElement("div");
    imageOne.classList.add("detail__image-one");
    imageOne.style.backgroundImage = `url(${product.masterVariant.images?.[0].url})`;

    if (product.masterVariant.images?.[1]) {
      const imageTwo: HTMLElement = document.createElement("div");
      imageTwo.classList.add("detail__image-two");
      imageTwo.style.backgroundImage = `url(${product.masterVariant.images?.[1].url})`;
      imageWrapper.append(imageTwo);
    }
    if (product.masterVariant.images?.[2]) {
      const imageThree: HTMLElement = document.createElement("div");
      imageThree.classList.add("detail__image-three");
      imageThree.style.backgroundImage = `url(${product.masterVariant.images?.[2].url})`;
      imageWrapper.append(imageThree);
    }

    const description: HTMLElement = document.createElement("div");
    description.classList.add("detail__description");

    const mainDescription: HTMLElement = document.createElement("p");
    mainDescription.classList.add("detail__main-description");
    mainDescription.innerText = product.description?.["en-US"] as string;

    const metaDescription: HTMLElement = document.createElement("p");
    metaDescription.classList.add("detail__meta-description");
    metaDescription.innerText = product.metaDescription?.["en-US"] as string;

    const firstVariantPrice: HTMLElement = document.createElement("p");
    firstVariantPrice.classList.add("detail__price");

    const secondVariantPrice: HTMLElement = document.createElement("p");
    secondVariantPrice.classList.add("detail__price");

    const thirdVariantPrice: HTMLElement = document.createElement("p");
    thirdVariantPrice.classList.add("detail__price");

    const btnToCatalog: HTMLButtonElement = document.createElement("button");
    btnToCatalog.classList.add("detail__to-catalog");
    btnToCatalog.textContent = "Back to Catalog";

    const separator = product.masterVariant.sku?.indexOf("-");
    const firstProductData: ProductVariant = product.masterVariant;
    const secondProductData: ProductVariant = product.variants[0];
    const thirdProductData: ProductVariant = product.variants[1];

    if (firstProductData.prices?.[0].discounted) {
      firstVariantPrice.classList.add("detail__price--discount");
      firstVariantPrice.innerHTML = `${(
        (firstProductData.prices?.[0].value.centAmount as number) / 100
      )
        .toFixed(2)
        .strike()} ${(
        (firstProductData.prices?.[0].discounted.value.centAmount as number) /
        100
      ).toFixed(2)} EUR ${firstProductData.sku?.substring(
        separator as number,
      )}`;
    } else {
      firstVariantPrice.innerHTML = `${(
        (firstProductData.prices?.[0].value.centAmount as number) / 100
      ).toFixed(2)} EUR ${firstProductData.sku?.substring(
        separator as number,
      )}`;
    }

    if (secondProductData) {
      if (secondProductData.prices?.[0].discounted) {
        secondVariantPrice.classList.add("detail__price--discount");
        secondVariantPrice.innerHTML = `${(
          (secondProductData.prices?.[0].value.centAmount as number) / 100
        )
          .toFixed(2)
          .strike()} ${(
          (secondProductData.prices?.[0].discounted.value
            .centAmount as number) / 100
        ).toFixed(2)} EUR ${secondProductData.sku?.substring(
          separator as number,
        )}`;
      } else {
        secondVariantPrice.innerHTML = `${(
          (secondProductData.prices?.[0].value.centAmount as number) / 100
        ).toFixed(2)} EUR ${secondProductData.sku?.substring(
          separator as number,
        )}`;
      }
    }

    if (thirdProductData) {
      if (thirdProductData.prices?.[0].discounted) {
        thirdVariantPrice.classList.add("detail__price--discount");
        thirdVariantPrice.innerHTML = `${(
          (thirdProductData.prices?.[0].value.centAmount as number) / 100
        )
          .toFixed(2)
          .strike()} ${(
          (thirdProductData.prices?.[0].discounted.value.centAmount as number) /
          100
        ).toFixed(2)} EUR ${thirdProductData.sku?.substring(
          separator as number,
        )}`;
      } else {
        thirdVariantPrice.innerHTML = `${(
          (thirdProductData.prices?.[0].value.centAmount as number) / 100
        ).toFixed(2)} EUR ${thirdProductData.sku?.substring(
          separator as number,
        )}`;
      }
    }

    mainWrapper.append(
      caption,
      wrapper,
      btnToCatalog,
      this.showModalWindow(
        imageWrapper,
        imageSlider,
        imageButtonWrapper,
        btnClose,
        btnLeft,
      ),
    );
    wrapper.append(imageSlider, description);
    description.append(
      mainDescription,
      metaDescription,
      firstVariantPrice,
      secondVariantPrice,
      thirdVariantPrice,
    );
    imageButtonWrapper.append(imageWrapper, btnClose);
    imageSlider.append(btnLeft, imageButtonWrapper, btnRight);
    imageWrapper.append(imageOne);

    this.showSlider(imageWrapper, btnLeft, btnRight);
    this.events.clickToCatalogButton(btnToCatalog);
    return mainWrapper;
  }

  showModalWindow(
    imageWrapper: HTMLElement,
    imageSlider: HTMLElement,
    imageButtonWrapper: HTMLElement,
    btnClose: HTMLButtonElement,
    btnLeft: HTMLButtonElement,
  ) {
    const modalWindow = document.createElement("div");
    modalWindow.classList.add("detail__modal");

    imageWrapper.addEventListener("click", () => {
      modalWindow.style.display = "table";
      imageSlider.style.position = "absolute";
      imageButtonWrapper.style.maxWidth = "700px";
      btnClose.style.display = "block";
      btnLeft.style.order = "1";
      imageSlider.style.flexDirection = "column";
    });

    btnClose.addEventListener("click", () => {
      modalWindow.style.display = "none";
      imageSlider.style.position = "unset";
      imageButtonWrapper.style.maxWidth = "300px";
      btnClose.style.display = "none";
      btnLeft.style.order = "unset";
      imageSlider.style.flexDirection = "unset";
    });
    return modalWindow;
  }

  showSlider(
    imageWrapper: HTMLElement,
    btnLeft: HTMLButtonElement,
    btnRight: HTMLButtonElement,
  ): void {
    if (imageWrapper.children.length === 1) {
      btnRight.style.display = "none";
      btnLeft.style.display = "none";
    }

    const slider = getSlider({
      containerElem: imageWrapper,
      trTime: 1.5,
      delay: 5,
      startVal: -120,
      endVal: 120,
    });

    let revers = false;

    btnRight.addEventListener("click", () => {
      if (revers) {
        slider.reverse();
        revers = false;
      }
      slider.next();
      slider.pause();
      btnRight.disabled = true;
      btnLeft.disabled = true;
      setTimeout(() => {
        btnRight.disabled = false;
        btnLeft.disabled = false;
      }, 1500);
    });

    btnLeft.addEventListener("click", () => {
      if (!revers) {
        slider.reverse();
        revers = true;
      }
      slider.next();
      slider.pause();
      btnRight.disabled = true;
      btnLeft.disabled = true;
      setTimeout(() => {
        btnRight.disabled = false;
        btnLeft.disabled = false;
      }, 1500);
    });

    imageWrapper.addEventListener("click", () => slider.pause());
  }
}

export default DetailPage;
