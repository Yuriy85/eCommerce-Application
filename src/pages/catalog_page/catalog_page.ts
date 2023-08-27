import "./catalog_page.scss";
import Products from "../../controller/products";

class CatalogPage {
  products: Products;
  constructor() {
    this.products = new Products();
  }
  async render(): Promise<HTMLElement> {
    const mainWrapper: HTMLElement = document.createElement("div");
    const caption: HTMLElement = document.createElement("h2");
    mainWrapper.classList.add("catalog");
    caption.classList.add("catalog__caption");
    mainWrapper.innerHTML = "";
    caption.innerText = "Catalog Product page";
    const index = 0;
    const cardProduct = await this.createCardProduct(index);
    mainWrapper.append(caption, cardProduct);
    return mainWrapper;
  }

  async createCardProduct(index: number) {
    const card: HTMLElement = document.createElement("div");
    const title: HTMLElement = document.createElement("h2");
    const subtitle: HTMLElement = document.createElement("h5");
    const image: HTMLElement = document.createElement("div");
    const price: HTMLElement = document.createElement("h5");
    const priceVariant: HTMLElement = document.createElement("h5");
    const priceVariantTwo: HTMLElement = document.createElement("h5");

    card.classList.add("card");
    card.setAttribute("id", `card-${index}`);
    title.classList.add("card__title");
    subtitle.classList.add("card__subtitle");
    image.classList.add("card__img");
    price.classList.add("card__price");
    priceVariant.classList.add("card__price");
    priceVariantTwo.classList.add("card__price");

    const namePromise: string = await this.products.getProductName(index);
    const descriptionPromise: string | undefined =
      await this.products.getProductDescription(index);
    const imagePromise: string | undefined =
      await this.products.getProductImage(index);
    const pricePromise: string | undefined =
      await this.products.getProductPrice(index);
    const pricePromiseVariant: string | undefined =
      await this.products.getProductPriceVariant(index);
    const pricePromiseVariantTwo: string | undefined =
      await this.products.getProductPriceVariantTwo(index);

    title.innerText = namePromise;
    image.style.backgroundImage = `url(${imagePromise})`;
    if (descriptionPromise) subtitle.innerText = descriptionPromise;
    if (pricePromise) price.innerText = pricePromise;
    if (pricePromiseVariant) priceVariant.innerText = pricePromiseVariant;
    if (pricePromiseVariantTwo)
      priceVariantTwo.innerText = pricePromiseVariantTwo;
    card.append(title, image, subtitle, price, priceVariant, priceVariantTwo);

    return card;
  }
}

export default CatalogPage;
