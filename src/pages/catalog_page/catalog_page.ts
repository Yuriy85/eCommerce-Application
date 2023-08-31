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
    const selectWrapper: HTMLElement = document.createElement("div");
    const filterWrapper: HTMLElement = document.createElement("div");
    const sortWrapper: HTMLElement = document.createElement("div");
    const filterTitle: HTMLElement = document.createElement("p");
    const sortTitle: HTMLElement = document.createElement("p");
    const filterElement: HTMLSelectElement = this.createSelectFilterElement();
    const sortElement: HTMLSelectElement = this.createSelectSortElement();
    const productWrapper: HTMLElement = document.createElement("div");
    mainWrapper.classList.add("catalog");
    caption.classList.add("catalog__caption");

    selectWrapper.classList.add("catalog__select-wrapper");
    filterWrapper.classList.add("catalog__filter-wrapper");
    sortWrapper.classList.add("catalog__sort-wrapper");
    productWrapper.classList.add("catalog__products");
    filterTitle.classList.add("catalog__filter-title");
    sortTitle.classList.add("catalog__sort-title");
    filterTitle.innerText = "Filter:";
    sortTitle.innerText = "Sort:";
    mainWrapper.innerHTML = "";
    caption.innerText = "Catalog Product page";

    const cardProducts: ProductProjection[] = (await this.products.getProduct())
      .body.results;

    cardProducts.forEach((product) => {
      const productCard = this.createCardProduct(product);
      productWrapper.append(productCard);
      this.events.clickProductCard(productCard);
    });

    filterElement?.addEventListener("change", async () => {
      productWrapper.innerHTML = "";
      const sortReset: HTMLOptionElement = document.querySelector(
        ".catalog__sort-reset",
      ) as HTMLOptionElement;
      sortReset.selected = true;
      if (
        filterElement.options[filterElement.selectedIndex].text ===
        "Reset filter"
      ) {
        const cardProductsFilterAll: ProductProjection[] = (
          await this.products.getProduct()
        ).body.results;
        cardProductsFilterAll.forEach((product) => {
          const productCard = this.createCardProduct(product);
          productWrapper.append(productCard);
          this.events.clickProductCard(productCard);
        });
      }
      if (
        filterElement.options[filterElement.selectedIndex].text ===
        "Lactose free"
      ) {
        const cardProductsFilterYes: ProductProjection[] = (
          await this.products.getProductFilter("yes")
        ).body.results;
        cardProductsFilterYes.forEach((product) => {
          const productCard = this.createCardProduct(product);
          productWrapper.append(productCard);
          this.events.clickProductCard(productCard);
        });
      }
      if (
        filterElement.options[filterElement.selectedIndex].text ===
        "With lactose"
      ) {
        const cardProductsFilterNo: ProductProjection[] = (
          await this.products.getProductFilter("no")
        ).body.results;
        cardProductsFilterNo.forEach((product) => {
          const productCard = this.createCardProduct(product);
          productWrapper.append(productCard);
          this.events.clickProductCard(productCard);
        });
      }
    });

    sortElement?.addEventListener("change", async () => {
      productWrapper.innerHTML = "";
      const filterReset: HTMLOptionElement = document.querySelector(
        ".catalog__filter-reset",
      ) as HTMLOptionElement;
      filterReset.selected = true;
      if (
        sortElement.options[sortElement.selectedIndex].text === "Reset sort"
      ) {
        const sortReset: ProductProjection[] = (
          await this.products.getProduct()
        ).body.results;
        sortReset.forEach((product) => {
          const productCard = this.createCardProduct(product);
          productWrapper.append(productCard);
          this.events.clickProductCard(productCard);
        });
      }
      if (sortElement.options[sortElement.selectedIndex].text === "A-Z") {
        const cardSortAlphabetically: ProductProjection[] = (
          await this.products.getProductSort("name.en-US asc")
        ).body.results;
        cardSortAlphabetically.forEach((product) => {
          const productCard = this.createCardProduct(product);
          productWrapper.append(productCard);
          this.events.clickProductCard(productCard);
        });
      }
      if (
        sortElement.options[sortElement.selectedIndex].text ===
        "Price ascending"
      ) {
        const cardSortPriceAscending: ProductProjection[] = (
          await this.products.getProductSort("price asc")
        ).body.results;
        cardSortPriceAscending.forEach((product) => {
          const productCard = this.createCardProduct(product);
          productWrapper.append(productCard);
          this.events.clickProductCard(productCard);
        });
      }
      if (
        sortElement.options[sortElement.selectedIndex].text ===
        "Price descending"
      ) {
        const cardSortPriceDescending: ProductProjection[] = (
          await this.products.getProductSort("price desc")
        ).body.results;
        cardSortPriceDescending.forEach((product) => {
          const productCard = this.createCardProduct(product);
          productWrapper.append(productCard);
          this.events.clickProductCard(productCard);
        });
      }
    });
    filterWrapper.append(filterTitle, filterElement);
    sortWrapper.append(sortTitle, sortElement);
    selectWrapper.append(filterWrapper, sortWrapper);

    mainWrapper.append(caption, selectWrapper, productWrapper);
    return mainWrapper;
  }

  createSelectFilterElement() {
    const filter: HTMLSelectElement = document.createElement("select");
    const resetFilter = document.createElement("option");
    const lactoseYes: HTMLOptionElement = document.createElement("option");
    const lactoseNo: HTMLOptionElement = document.createElement("option");
    filter.classList.add("catalog__filter-select");
    resetFilter.classList.add("catalog__filter-reset");
    lactoseYes.classList.add("catalog__filter-yes");
    lactoseNo.classList.add("catalog__filter-no");
    resetFilter.innerText = "Reset filter";
    lactoseYes.innerText = "With lactose";
    lactoseNo.innerText = "Lactose free";
    filter.append(resetFilter, lactoseYes, lactoseNo);
    return filter;
  }

  createSelectSortElement() {
    const sort: HTMLSelectElement = document.createElement("select");
    const sortReset: HTMLOptionElement = document.createElement("option");
    const sortAlphabetically: HTMLOptionElement =
      document.createElement("option");
    const sortPriceAscending: HTMLOptionElement =
      document.createElement("option");
    const sortPriceDescending: HTMLOptionElement =
      document.createElement("option");
    sort.classList.add("catalog__sort-select");
    sortReset.classList.add("catalog__sort-reset");
    sortAlphabetically.classList.add("catalog__sort-alphabetically");
    sortPriceAscending.classList.add("catalog__sort-ascending");
    sortPriceDescending.classList.add("catalog__sort-descending");
    sortReset.innerText = "Reset sort";
    sortAlphabetically.innerText = "A-Z";
    sortPriceAscending.innerText = "Price ascending";
    sortPriceDescending.innerText = "Price descending";
    sort.append(
      sortReset,
      sortAlphabetically,
      sortPriceAscending,
      sortPriceDescending,
    );
    return sort;
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
    subtitle.innerText = product.description?.["en-US"] as string;
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
