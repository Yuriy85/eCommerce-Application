import "./catalog_page.scss";
import Products from "../../controller/products";
import { ProductProjection, ProductVariant } from "@commercetools/platform-sdk";
import Events from "../../controller/events";

class CatalogPage {
  products: Products;
  events: Events;

  constructor() {
    this.products = new Products();
    this.events = new Events();
  }
  async render(): Promise<HTMLElement> {
    const mainWrapper: HTMLElement = document.createElement("div");
    const caption: HTMLElement = document.createElement("h2");
    const productWrapper: HTMLElement = document.createElement("div");
    mainWrapper.classList.add("catalog");
    productWrapper.classList.add("catalog__products");
    caption.classList.add("catalog__caption");
    mainWrapper.innerHTML = "";
    caption.innerText = "Catalog Product page";
    const cardProductsFilterAll: ProductProjection[] = (
      await this.products.getProduct()
    ).body.results;
    const cardProductsFilterYes: ProductProjection[] = (
      await this.products.getProductFilter("yes")
    ).body.results;
    const cardProductsFilterNo: ProductProjection[] = (
      await this.products.getProductFilter("no")
    ).body.results;
    const filter: HTMLSelectElement = this.filterCard();

    cardProductsFilterAll.forEach((product) => {
      const productCard = this.createCardProduct(product);
      productWrapper.append(productCard);
      this.events.clickProductCard(productCard);
    });

    filter?.addEventListener("change", () => {
      productWrapper.innerHTML = "";
      if (filter.options[filter.selectedIndex].text === "All") {
        cardProductsFilterAll.forEach((product) => {
          const productCard = this.createCardProduct(product);
          productWrapper.append(productCard);
          this.events.clickProductCard(productCard);
        });
      }
      if (filter.options[filter.selectedIndex].text === "No Lactose") {
        cardProductsFilterNo.forEach((product) => {
          const productCard = this.createCardProduct(product);
          productWrapper.append(productCard);
          this.events.clickProductCard(productCard);
        });
      }
      if (filter.options[filter.selectedIndex].text === "Lactose") {
        cardProductsFilterYes.forEach((product) => {
          const productCard = this.createCardProduct(product);
          productWrapper.append(productCard);
          this.events.clickProductCard(productCard);
        });
      }
    });
    mainWrapper.append(caption, filter, productWrapper);
    return mainWrapper;
  }

  filterCard() {
    const filter: HTMLSelectElement = document.createElement("select");
    const lactoseYes: HTMLOptionElement = document.createElement("option");
    const lactoseAll: HTMLOptionElement = document.createElement("option");
    const lactoseNo: HTMLOptionElement = document.createElement("option");
    filter.classList.add("catalog__filter-select");
    lactoseAll.classList.add("catalog__filter-all");
    lactoseYes.classList.add("catalog__filter-yes");
    lactoseNo.classList.add("catalog__filter-no");
    lactoseAll.innerText = "All";
    lactoseYes.innerText = "Lactose";
    lactoseNo.innerText = "No Lactose";
    filter.append(lactoseAll, lactoseYes, lactoseNo);
    return filter;
  }

  createCardProduct(product: ProductProjection): HTMLElement {
    const card: HTMLElement = document.createElement("div");
    const title: HTMLElement = document.createElement("h2");
    const subtitle: HTMLElement = document.createElement("h4");
    const image: HTMLElement = document.createElement("div");
    const priceWrapper: HTMLElement = document.createElement("div");
    const price: HTMLElement = document.createElement("h4");
    const priceVariant: HTMLElement = document.createElement("h4");
    const priceVariantTwo: HTMLElement = document.createElement("h4");

    card.classList.add("catalog__card");
    card.setAttribute("id", product.id);
    title.classList.add("catalog__card-title");
    subtitle.classList.add("catalog__card-subtitle");
    image.classList.add("catalog__card-img");
    priceWrapper.classList.add("catalog__price-wrapper");
    price.classList.add("catalog__card-first-price");
    priceVariant.classList.add("catalog__card-second-price");
    priceVariantTwo.classList.add("catalog__card-third-price");

    title.innerText = product.name["en-US"];
    image.style.backgroundImage = `url(${product.masterVariant.images?.[0].url})`;
    subtitle.innerText = (product.description?.["en-US"] as string).split(
      "#",
    )[0];
    const separator = product.masterVariant.sku?.indexOf("-");
    const firstProductData: ProductVariant = product.masterVariant;
    const secondProductData: ProductVariant = product.variants[0];
    const thirdProductData: ProductVariant = product.variants[1];

    if (firstProductData.prices?.[0].discounted) {
      price.classList.add("catalog__card--discount");
      price.innerHTML = `${(
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
      price.innerHTML = `${(
        (firstProductData.prices?.[0].value.centAmount as number) / 100
      ).toFixed(2)} EUR ${firstProductData.sku?.substring(
        separator as number,
      )}`;
    }
    if (secondProductData) {
      if (secondProductData.prices?.[0].discounted) {
        priceVariant.classList.add("catalog__card--discount");
        priceVariant.innerHTML = `${(
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
        priceVariant.innerHTML = `${(
          (secondProductData.prices?.[0].value.centAmount as number) / 100
        ).toFixed(2)} EUR ${secondProductData.sku?.substring(
          separator as number,
        )}`;
      }
    }
    if (thirdProductData) {
      if (thirdProductData.prices?.[0].discounted) {
        priceVariantTwo.classList.add("catalog__card--discount");
        priceVariantTwo.innerHTML = `${(
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
        priceVariantTwo.innerHTML = `${(
          (thirdProductData.prices?.[0].value.centAmount as number) / 100
        ).toFixed(2)} EUR ${thirdProductData.sku?.substring(
          separator as number,
        )}`;
      }
    }

    priceWrapper.append(price, priceVariant, priceVariantTwo);

    card.append(title, image, subtitle, priceWrapper);

    return card;
  }
}

export default CatalogPage;
