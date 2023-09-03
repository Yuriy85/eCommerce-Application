import "./catalog_page.scss";
import Products from "../../controller/products";
import { ProductProjection, ProductVariant } from "@commercetools/platform-sdk";
import Events from "../../controller/events";
import { indexCategories } from "../data/index-categories";
import QueryArgs from "../data/query-arguments";

class CatalogPage {
  products: Products;
  events: Events;
  queryArgs: QueryArgs;
  navigationWrapper: HTMLUListElement;
  productWrapper: HTMLElement;
  catalogLiElement: HTMLLIElement;
  categoriesLiElement: HTMLLIElement;
  subcategoriesLiElement: HTMLLIElement;
  buttonSearch: HTMLButtonElement;
  inputSearch: HTMLInputElement;
  closeSearch: HTMLDivElement;
  sushiSelectElement: HTMLSelectElement;
  dessertsSelectElement: HTMLSelectElement;
  drinksSelectElement: HTMLSelectElement;
  optionDessertsReset: HTMLOptionElement;
  optionSushiReset: HTMLOptionElement;
  optionDrinksReset: HTMLOptionElement;
  optionSushi: HTMLOptionElement;
  optionSortReset: HTMLOptionElement;
  optionFilterReset: HTMLOptionElement;
  optionDesserts: HTMLOptionElement;
  optionDrinks: HTMLOptionElement;

  constructor() {
    this.products = new Products();
    this.events = new Events();
    this.queryArgs = new QueryArgs();
    this.navigationWrapper = document.createElement("ul");
    this.productWrapper = document.createElement("div");
    this.catalogLiElement = document.createElement("li");
    this.categoriesLiElement = document.createElement("li");
    this.subcategoriesLiElement = document.createElement("li");
    this.buttonSearch = document.createElement("button");
    this.inputSearch = document.createElement("input");
    this.closeSearch = document.createElement("div");
    this.sushiSelectElement = document.createElement("select");
    this.dessertsSelectElement = document.createElement("select");
    this.drinksSelectElement = document.createElement("select");
    this.optionSushiReset = document.createElement("option");
    this.optionDessertsReset = document.createElement("option");
    this.optionDrinksReset = document.createElement("option");
    this.optionSushi = document.createElement("option");
    this.optionDesserts = document.createElement("option");
    this.optionDrinks = document.createElement("option");
    this.optionSortReset = document.createElement("option");
    this.optionFilterReset = document.createElement("option");
  }

  async render(): Promise<HTMLElement> {
    const mainWrapper: HTMLElement = document.createElement("div");
    const caption: HTMLElement = document.createElement("h2");
    const categoriesWrapper: HTMLElement = this.createMenuCategoriesElement();
    const menuWrapper: HTMLElement = document.createElement("div");
    const filterWrapper: HTMLElement = document.createElement("div");
    const sortWrapper: HTMLElement = document.createElement("div");
    const filterTitle: HTMLElement = document.createElement("p");
    const sortTitle: HTMLElement = document.createElement("p");
    const filterElement: HTMLSelectElement = this.createMenuFilterElement();
    const sortElement: HTMLSelectElement = this.createMenuSortElement();
    const searchElement: HTMLElement = this.createMenuSearchElement();
    const btnSearch: HTMLButtonElement = this.buttonSearch;
    const closeSearch: HTMLDivElement = this.closeSearch;
    const categoriesSushi: HTMLSelectElement = this.sushiSelectElement;
    const dessertSelectElement: HTMLSelectElement = this.dessertsSelectElement;
    const drinksSelectElement: HTMLSelectElement = this.drinksSelectElement;
    mainWrapper.classList.add("catalog");
    caption.classList.add("catalog__caption");
    categoriesWrapper.classList.add("catalog__categories-wrapper");
    menuWrapper.classList.add("catalog__menu-wrapper");
    filterWrapper.classList.add("catalog__filter-wrapper");
    sortWrapper.classList.add("catalog__sort-wrapper");
    this.productWrapper.classList.add("catalog__products");
    filterTitle.classList.add("catalog__filter-title");
    sortTitle.classList.add("catalog__sort-title");
    filterTitle.innerText = "Filter:";
    sortTitle.innerText = "Sort:";
    mainWrapper.innerHTML = "";
    caption.innerText = "Catalog Product page";

    const cardProducts: ProductProjection[] = (
      await this.products.getProducts(this.queryArgs.getQueryArgs().productsAll)
    ).body.results;
    this.addCardProductsToPage(cardProducts);

    this.navigationWrapper.addEventListener("click", async (event) => {
      const currentElement: HTMLElement = event.target as HTMLElement;
      if (currentElement.textContent === "Catalog") {
        this.productWrapper.innerHTML = "";
        this.optionDrinksReset.selected = true;
        this.optionDessertsReset.selected = true;
        this.optionSushiReset.selected = true;
        this.categoriesLiElement.textContent = "";
        this.subcategoriesLiElement.textContent = "";
        const cardProductsAll: ProductProjection[] = (
          await this.products.getProducts(
            this.queryArgs.getQueryArgs().productsAll,
          )
        ).body.results;
        this.addCardProductsToPage(cardProductsAll);
      }
      if (currentElement.textContent === "/ Sushi") {
        this.productWrapper.innerHTML = "";
        this.optionSushi.selected = true;
        this.subcategoriesLiElement.textContent = "";
        const cardCategories: ProductProjection[] = (
          await this.products.getProducts(
            (await this.queryArgs.getQueryArgsCategories(indexCategories.sushi))
              .categoriesSushi,
          )
        ).body.results;
        this.addCardProductsToPage(cardCategories);
      }
      if (currentElement.textContent === "/ Desserts") {
        this.productWrapper.innerHTML = "";
        this.optionDesserts.selected = true;
        this.subcategoriesLiElement.textContent = "";
        const cardCategories: ProductProjection[] = (
          await this.products.getProducts(
            (
              await this.queryArgs.getQueryArgsCategories(
                indexCategories.desserts,
              )
            ).categoriesSushi,
          )
        ).body.results;
        this.addCardProductsToPage(cardCategories);
      }

      if (currentElement.textContent === "/ Drinks") {
        this.productWrapper.innerHTML = "";
        this.optionDrinks.selected = true;
        this.subcategoriesLiElement.textContent = "";
        const cardCategories: ProductProjection[] = (
          await this.products.getProducts(
            (
              await this.queryArgs.getQueryArgsCategories(
                indexCategories.drinks,
              )
            ).categoriesSushi,
          )
        ).body.results;
        this.addCardProductsToPage(cardCategories);
      }
    });

    filterElement?.addEventListener("change", async () => {
      this.productWrapper.innerHTML = "";
      const filterItem: HTMLOptionElement =
        filterElement.options[filterElement.selectedIndex];
      this.optionSortReset.selected = true;
      if (filterItem.text === "Reset filter") {
        const cardProductsFilterAll: ProductProjection[] = (
          await this.products.getProducts(
            this.queryArgs.getQueryArgs().productsAll,
          )
        ).body.results;
        this.addCardProductsToPage(cardProductsFilterAll);
      }
      if (filterItem.text === "With lactose") {
        const cardProductsFilterLactoseYes: ProductProjection[] = (
          await this.products.getProducts(
            this.queryArgs.getQueryArgs().filterLactoseYes,
          )
        ).body.results;
        this.addCardProductsToPage(cardProductsFilterLactoseYes);
      }
      if (filterItem.text === "Lactose free") {
        const cardProductsFilterLactoseNo: ProductProjection[] = (
          await this.products.getProducts(
            this.queryArgs.getQueryArgs().filterLactoseNo,
          )
        ).body.results;
        this.addCardProductsToPage(cardProductsFilterLactoseNo);
      }
    });

    sortElement?.addEventListener("change", async () => {
      this.productWrapper.innerHTML = "";
      const sortItem: HTMLOptionElement =
        sortElement.options[sortElement.selectedIndex];
      this.optionFilterReset.selected = true;
      if (sortItem.text === "Reset sort") {
        const cardProductsSortReset: ProductProjection[] = (
          await this.products.getProducts(
            this.queryArgs.getQueryArgs().productsAll,
          )
        ).body.results;
        this.addCardProductsToPage(cardProductsSortReset);
      }
      if (sortItem.text === "A-Z") {
        const cardProductsSortAz: ProductProjection[] = (
          await this.products.getProducts(
            this.queryArgs.getQueryArgs().sortAlphabetically,
          )
        ).body.results;
        this.addCardProductsToPage(cardProductsSortAz);
      }
      if (sortItem.text === "Price ascending") {
        const cardProductsSortAz: ProductProjection[] = (
          await this.products.getProducts(
            this.queryArgs.getQueryArgs().sortAscending,
          )
        ).body.results;
        this.addCardProductsToPage(cardProductsSortAz);
      }
      if (sortItem.text === "Price descending") {
        const cardProductsSortAz: ProductProjection[] = (
          await this.products.getProducts(
            this.queryArgs.getQueryArgs().sortDescending,
          )
        ).body.results;
        this.addCardProductsToPage(cardProductsSortAz);
      }
    });

    btnSearch?.addEventListener("click", async () => {
      this.productWrapper.innerHTML = "";
      const inputValue = this.inputSearch.value;
      const cardSearch: ProductProjection[] = (
        await this.products.getProducts(
          this.queryArgs.getQueryArgs(inputValue).searchText,
        )
      ).body.results;
      this.addCardProductsToPage(cardSearch);
    });

    closeSearch?.addEventListener("click", async () => {
      this.productWrapper.innerHTML = "";
      this.inputSearch.value = "";
      const cardProductsCloseSearch: ProductProjection[] = (
        await this.products.getProducts(
          this.queryArgs.getQueryArgs().productsAll,
        )
      ).body.results;
      this.addCardProductsToPage(cardProductsCloseSearch);
    });

    categoriesSushi?.addEventListener("change", async () => {
      this.optionDrinksReset.selected = true;
      this.optionDessertsReset.selected = true;
      this.productWrapper.innerHTML = "";
      const categoriesSushiItem =
        categoriesSushi.options[categoriesSushi.selectedIndex];
      if (categoriesSushiItem.text === "") {
        this.categoriesLiElement.textContent = "";
        this.subcategoriesLiElement.textContent = "";
        const cardProductsFilterAll: ProductProjection[] = (
          await this.products.getProducts(
            this.queryArgs.getQueryArgs().productsAll,
          )
        ).body.results;
        this.addCardProductsToPage(cardProductsFilterAll);
      }
      if (categoriesSushiItem.text === "Sushi") {
        this.categoriesLiElement.textContent = "/ Sushi";
        this.subcategoriesLiElement.textContent = "";
        const cardCategories: ProductProjection[] = (
          await this.products.getProducts(
            (await this.queryArgs.getQueryArgsCategories(indexCategories.sushi))
              .categoriesSushi,
          )
        ).body.results;
        this.addCardProductsToPage(cardCategories);
      }
      if (categoriesSushiItem.text === " > Roll") {
        this.categoriesLiElement.textContent = "/ Sushi";
        this.subcategoriesLiElement.textContent = "/ Roll";
        const cardCategories: ProductProjection[] = (
          await this.products.getProducts(
            (await this.queryArgs.getQueryArgsCategories(indexCategories.rolls))
              .categoriesSushi,
          )
        ).body.results;
        this.addCardProductsToPage(cardCategories);
      }
      if (categoriesSushiItem.text === " > Set") {
        this.categoriesLiElement.textContent = "/ Sushi";
        this.subcategoriesLiElement.textContent = "/ Set";
        const cardCategories: ProductProjection[] = (
          await this.products.getProducts(
            (await this.queryArgs.getQueryArgsCategories(indexCategories.set))
              .categoriesSushi,
          )
        ).body.results;
        this.addCardProductsToPage(cardCategories);
      }
    });
    dessertSelectElement?.addEventListener("change", async () => {
      this.productWrapper.innerHTML = "";
      this.optionDrinksReset.selected = true;
      this.optionSushiReset.selected = true;
      const categoriesDessertsItem =
        dessertSelectElement.options[dessertSelectElement.selectedIndex];
      if (categoriesDessertsItem.text === "") {
        this.categoriesLiElement.textContent = "";
        this.subcategoriesLiElement.textContent = "";
        const cardProductsFilterAll: ProductProjection[] = (
          await this.products.getProducts(
            this.queryArgs.getQueryArgs().productsAll,
          )
        ).body.results;
        this.addCardProductsToPage(cardProductsFilterAll);
      }
      if (categoriesDessertsItem.text === "Desserts") {
        this.categoriesLiElement.textContent = "/ Desserts";
        this.subcategoriesLiElement.textContent = "";
        const cardCategories: ProductProjection[] = (
          await this.products.getProducts(
            (
              await this.queryArgs.getQueryArgsCategories(
                indexCategories.desserts,
              )
            ).categoriesSushi,
          )
        ).body.results;
        this.addCardProductsToPage(cardCategories);
      }
      if (categoriesDessertsItem.text === " > Healthy food") {
        this.categoriesLiElement.textContent = "/ Desserts";
        this.subcategoriesLiElement.textContent = "/ Healthy food";
        const cardCategories: ProductProjection[] = (
          await this.products.getProducts(
            (
              await this.queryArgs.getQueryArgsCategories(
                indexCategories.healthyFood,
              )
            ).categoriesSushi,
          )
        ).body.results;
        this.addCardProductsToPage(cardCategories);
      }
      if (categoriesDessertsItem.text === " > Usual dessert") {
        this.categoriesLiElement.textContent = "/ Desserts";
        this.subcategoriesLiElement.textContent = "/ Usual dessert";
        const cardCategories: ProductProjection[] = (
          await this.products.getProducts(
            (
              await this.queryArgs.getQueryArgsCategories(
                indexCategories.usualDessert,
              )
            ).categoriesSushi,
          )
        ).body.results;
        this.addCardProductsToPage(cardCategories);
      }
    });
    drinksSelectElement?.addEventListener("change", async () => {
      this.productWrapper.innerHTML = "";
      this.optionDessertsReset.selected = true;
      this.optionSushiReset.selected = true;
      const categoriesDrinksItem =
        drinksSelectElement.options[drinksSelectElement.selectedIndex];
      if (categoriesDrinksItem.text === "") {
        this.categoriesLiElement.textContent = "";
        this.subcategoriesLiElement.textContent = "";
        const cardProductsFilterAll: ProductProjection[] = (
          await this.products.getProducts(
            this.queryArgs.getQueryArgs().productsAll,
          )
        ).body.results;
        this.addCardProductsToPage(cardProductsFilterAll);
      }
      if (categoriesDrinksItem.text === "Drinks") {
        this.categoriesLiElement.textContent = "/ Drinks";
        this.subcategoriesLiElement.textContent = "";
        const cardCategories: ProductProjection[] = (
          await this.products.getProducts(
            (
              await this.queryArgs.getQueryArgsCategories(
                indexCategories.drinks,
              )
            ).categoriesSushi,
          )
        ).body.results;
        this.addCardProductsToPage(cardCategories);
      }
      if (categoriesDrinksItem.text === " > Soft drinks") {
        this.categoriesLiElement.textContent = "/ Drinks";
        this.subcategoriesLiElement.textContent = "/ Soft drinks";
        const cardCategories: ProductProjection[] = (
          await this.products.getProducts(
            (
              await this.queryArgs.getQueryArgsCategories(
                indexCategories.softDrinks,
              )
            ).categoriesSushi,
          )
        ).body.results;
        this.addCardProductsToPage(cardCategories);
      }
      if (categoriesDrinksItem.text === " > Hot drinks") {
        this.categoriesLiElement.textContent = "/ Drinks";
        this.subcategoriesLiElement.textContent = "/ Hot drinks";
        const cardCategories: ProductProjection[] = (
          await this.products.getProducts(
            (
              await this.queryArgs.getQueryArgsCategories(
                indexCategories.hotDrinks,
              )
            ).categoriesSushi,
          )
        ).body.results;
        this.addCardProductsToPage(cardCategories);
      }
    });

    filterWrapper.append(filterTitle, filterElement);
    sortWrapper.append(sortTitle, sortElement);
    menuWrapper.append(searchElement, filterWrapper, sortWrapper);
    mainWrapper.append(
      caption,
      this.createNavigationElement(),
      categoriesWrapper,
      menuWrapper,
      this.productWrapper,
    );
    return mainWrapper;
  }

  addCardProductsToPage(cardProducts: ProductProjection[]) {
    cardProducts.forEach((product) => {
      const productCard = this.createCardProduct(product);
      this.productWrapper.append(productCard);
      this.events.clickProductCard(productCard);
    });
  }

  createNavigationElement() {
    const navigationWrapper: HTMLUListElement = this.navigationWrapper;
    const catalogLiElement: HTMLLIElement = this.catalogLiElement;
    const categoriesLiElement: HTMLLIElement = this.categoriesLiElement;
    const subcategoriesLiElement: HTMLLIElement = this.subcategoriesLiElement;
    navigationWrapper.classList.add("catalog__nav-wrapper");
    catalogLiElement.classList.add("catalog__nav-catalog");
    categoriesLiElement.classList.add("catalog__nav-categories");
    subcategoriesLiElement.classList.add("catalog__nav-subcategories");
    catalogLiElement.textContent = "Catalog";
    categoriesLiElement.textContent = "";
    subcategoriesLiElement.textContent = "";
    navigationWrapper.append(
      catalogLiElement,
      categoriesLiElement,
      subcategoriesLiElement,
    );
    return navigationWrapper;
  }

  createMenuCategoriesElement(): HTMLElement {
    const categoriesWrapper: HTMLElement = document.createElement("div");
    const categoriesSushiWrapper: HTMLElement = document.createElement("div");
    const categoriesDessertsWrapper: HTMLElement =
      document.createElement("div");
    const categoriesDrinksWrapper: HTMLElement = document.createElement("div");
    const categoriesTitle: HTMLElement = document.createElement("p");
    const categoriesTitleSushi: HTMLElement = document.createElement("p");
    const categoriesTitleDesserts: HTMLElement = document.createElement("p");
    const categoriesTitleDrinks: HTMLElement = document.createElement("p");
    const sushiSelectElement: HTMLSelectElement = this.sushiSelectElement;
    const dessertSelectElement: HTMLSelectElement = this.dessertsSelectElement;
    const drinksSelectElement: HTMLSelectElement = this.drinksSelectElement;
    const optionSushi: HTMLOptionElement = this.optionSushi;
    const optionDesserts: HTMLOptionElement = this.optionDesserts;
    const optionDrinks: HTMLOptionElement = this.optionDrinks;
    const optionSushiRolls: HTMLOptionElement =
      document.createElement("option");
    const optionSushiSet: HTMLOptionElement = document.createElement("option");
    const optionDessertsHealthy: HTMLOptionElement =
      document.createElement("option");
    const optionDessertsUsual: HTMLOptionElement =
      document.createElement("option");
    const optionDrinksSoft: HTMLOptionElement =
      document.createElement("option");
    const optionDrinksHot: HTMLOptionElement = document.createElement("option");
    this.optionSushiReset.classList.add("catalog__categories-sushi-reset");
    this.optionDrinksReset.classList.add("catalog__categories-dessert-reset");
    this.optionDessertsReset.classList.add("catalog__categories-drinks-reset");
    sushiSelectElement.classList.add("catalog__categories-sushi-select");
    dessertSelectElement.classList.add("catalog__categories-dessert-select");
    drinksSelectElement.classList.add("catalog__categories-drinks-select");
    categoriesSushiWrapper.classList.add("catalog__categories-sushi-wrapper");
    categoriesDessertsWrapper.classList.add(
      "catalog__categories-desserts-wrapper",
    );
    categoriesDrinksWrapper.classList.add("catalog__categories-drinks-wrapper");
    categoriesTitle.innerText = "Categories:";
    categoriesTitleSushi.innerText = "Sushi:";
    categoriesTitleDesserts.innerText = "Desserts:";
    categoriesTitleDrinks.innerText = "Drinks:";
    sushiSelectElement.innerText = "Reset filter";
    dessertSelectElement.innerText = "With lactose";
    drinksSelectElement.innerText = "Lactose free";
    this.optionSushiReset.innerHTML = "";
    optionSushi.innerHTML = "Sushi";
    optionSushiRolls.innerHTML = "&nbsp;> Roll";
    optionSushiSet.innerHTML = "&nbsp;> Set";
    this.optionDessertsReset.innerHTML = "";
    optionDesserts.innerHTML = "Desserts";
    optionDessertsHealthy.innerHTML = "&nbsp;> Healthy food";
    optionDessertsUsual.innerHTML = "&nbsp;> Usual dessert";
    this.optionDrinksReset.innerHTML = "";
    optionDrinks.innerHTML = "Drinks";
    optionDrinksSoft.innerHTML = "&nbsp;> Soft drinks";
    optionDrinksHot.innerHTML = "&nbsp;> Hot drinks";
    sushiSelectElement.append(
      this.optionSushiReset,
      optionSushi,
      optionSushiRolls,
      optionSushiSet,
    );
    dessertSelectElement.append(
      this.optionDessertsReset,
      optionDesserts,
      optionDessertsHealthy,
      optionDessertsUsual,
    );
    drinksSelectElement.append(
      this.optionDrinksReset,
      optionDrinks,
      optionDrinksSoft,
      optionDrinksHot,
    );
    categoriesSushiWrapper.append(categoriesTitleSushi, sushiSelectElement);
    categoriesDessertsWrapper.append(
      categoriesTitleDesserts,
      dessertSelectElement,
    );
    categoriesDrinksWrapper.append(categoriesTitleDrinks, drinksSelectElement);
    categoriesWrapper.append(
      categoriesTitle,
      categoriesSushiWrapper,
      categoriesDessertsWrapper,
      categoriesDrinksWrapper,
    );
    return categoriesWrapper;
  }

  createMenuFilterElement(): HTMLSelectElement {
    const filter: HTMLSelectElement = document.createElement("select");
    const resetFilter = this.optionFilterReset;
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

  createMenuSortElement(): HTMLSelectElement {
    const sort: HTMLSelectElement = document.createElement("select");
    const sortReset: HTMLOptionElement = this.optionSortReset;
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

  createMenuSearchElement(): HTMLElement {
    const labelSearch: HTMLElement = document.createElement("div");
    const inputSearch = this.inputSearch;
    const btnSearch = this.buttonSearch;
    const closeSearch = this.closeSearch;
    labelSearch.classList.add("catalog__search-wrapper");
    inputSearch.classList.add("catalog__search-select");
    btnSearch.classList.add("catalog__search-button");
    closeSearch.classList.add("catalog__search-close");
    inputSearch.setAttribute("type", "text");
    inputSearch.setAttribute("type", "text");
    btnSearch.textContent = "ок";
    labelSearch.textContent = "Search:";
    closeSearch.innerHTML = "&#128473;";
    labelSearch.append(inputSearch, closeSearch, btnSearch);
    return labelSearch;
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
