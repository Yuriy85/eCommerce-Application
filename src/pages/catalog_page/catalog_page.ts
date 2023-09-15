import "./catalog_page.scss";
import Products from "../../controller/products";
import {
  Cart,
  ClientResponse,
  ProductProjection,
  ProductVariant,
} from "@commercetools/platform-sdk";
import Events from "../../controller/events";
import QueryArgs from "../data/query-arguments";

class CatalogPage {
  products: Products;
  events: Events;
  queryArgs: QueryArgs;

  constructor() {
    this.products = new Products();
    this.events = new Events();
    this.queryArgs = new QueryArgs();
  }

  async render(): Promise<HTMLElement> {
    const mainWrapper: HTMLElement = document.createElement("div");
    const caption: HTMLElement = document.createElement("h2");
    const productWrapper: HTMLDivElement = document.createElement("div");
    mainWrapper.classList.add("catalog");
    caption.classList.add("catalog__caption");
    productWrapper.classList.add("catalog__products");
    mainWrapper.innerHTML = "";
    caption.innerText = "Catalog Product page";

    const navigationWrapper = document.createElement("ul");
    const navigationCatalog: HTMLLIElement = document.createElement("li");
    const navigationCategories: HTMLLIElement = document.createElement("li");
    const navigationSubcategories: HTMLLIElement = document.createElement("li");
    navigationWrapper.classList.add("catalog__nav-wrapper");
    navigationCatalog.classList.add("catalog__nav-catalog");
    navigationCategories.classList.add("catalog__nav-categories");
    navigationSubcategories.classList.add("catalog__nav-subcategories");
    navigationCatalog.textContent = "Catalog";
    navigationCategories.textContent = "";
    navigationSubcategories.textContent = "";
    navigationWrapper.append(
      navigationCatalog,
      navigationCategories,
      navigationSubcategories,
    );

    const categoriesWrapper: HTMLElement = document.createElement("div");
    const categoriesSushiWrapper: HTMLElement = document.createElement("div");
    const categoriesDessertsWrapper: HTMLElement =
      document.createElement("div");
    const categoriesDrinksWrapper: HTMLElement = document.createElement("div");
    const categoriesTitle: HTMLElement = document.createElement("p");
    const categoriesTitleSushi: HTMLElement = document.createElement("p");
    const categoriesTitleDesserts: HTMLElement = document.createElement("p");
    const categoriesTitleDrinks: HTMLElement = document.createElement("p");
    const sushiSelectElement: HTMLSelectElement =
      document.createElement("select");
    const dessertSelectElement: HTMLSelectElement =
      document.createElement("select");
    const drinksSelectElement: HTMLSelectElement =
      document.createElement("select");
    const optionSushi: HTMLOptionElement = document.createElement("option");
    const optionDesserts: HTMLOptionElement = document.createElement("option");
    const optionDrinks: HTMLOptionElement = document.createElement("option");
    const optionDessertsReset: HTMLOptionElement =
      document.createElement("option");
    const optionSushiReset: HTMLOptionElement =
      document.createElement("option");
    const optionDrinksReset: HTMLOptionElement =
      document.createElement("option");
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
    categoriesWrapper.classList.add("catalog__categories-wrapper");
    categoriesSushiWrapper.classList.add("catalog__categories-sushi-wrapper");
    categoriesDessertsWrapper.classList.add(
      "catalog__categories-desserts-wrapper",
    );
    categoriesDrinksWrapper.classList.add("catalog__categories-drinks-wrapper");
    categoriesTitle.innerText = "Categories:";
    categoriesTitleSushi.innerText = "Sushi:";
    categoriesTitleDesserts.innerText = "Desserts:";
    categoriesTitleDrinks.innerText = "Drinks:";
    sushiSelectElement.classList.add("catalog__categories-sushi-select");
    dessertSelectElement.classList.add("catalog__categories-dessert-select");
    drinksSelectElement.classList.add("catalog__categories-drinks-select");
    optionSushiReset.classList.add("catalog__categories-dessert-reset");
    optionDessertsReset.classList.add("catalog__categories-sushi-reset");
    optionDrinksReset.classList.add("catalog__categories-drinks-reset");
    sushiSelectElement.innerText = "Reset filter";
    dessertSelectElement.innerText = "With lactose";
    drinksSelectElement.innerText = "Lactose free";
    optionSushiReset.innerHTML = "";
    optionSushi.innerHTML = "Sushi";
    optionSushiRolls.innerHTML = "&nbsp;> Roll";
    optionSushiSet.innerHTML = "&nbsp;> Set";
    optionDessertsReset.innerHTML = "";
    optionDesserts.innerHTML = "Desserts";
    optionDessertsHealthy.innerHTML = "&nbsp;> Healthy food";
    optionDessertsUsual.innerHTML = "&nbsp;> Usual dessert";
    optionDrinksReset.innerHTML = "";
    optionDrinks.innerHTML = "Drinks";
    optionDrinksSoft.innerHTML = "&nbsp;> Soft drinks";
    optionDrinksHot.innerHTML = "&nbsp;> Hot drinks";
    sushiSelectElement.append(
      optionSushiReset,
      optionSushi,
      optionSushiRolls,
      optionSushiSet,
    );
    dessertSelectElement.append(
      optionDessertsReset,
      optionDesserts,
      optionDessertsHealthy,
      optionDessertsUsual,
    );
    drinksSelectElement.append(
      optionDrinksReset,
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

    const menuWrapper: HTMLElement = document.createElement("div");
    const searchWrapper: HTMLElement = document.createElement("div");
    const inputSearch = document.createElement("input");
    const btnSearch: HTMLButtonElement = document.createElement("button");
    const closeSearch: HTMLDivElement = document.createElement("div");
    menuWrapper.classList.add("catalog__menu-wrapper");
    searchWrapper.classList.add("catalog__search-wrapper");
    inputSearch.classList.add("catalog__search-select");
    btnSearch.classList.add("catalog__search-button");
    closeSearch.classList.add("catalog__search-close");
    inputSearch.setAttribute("type", "text");
    inputSearch.setAttribute("type", "text");
    btnSearch.textContent = "ок";
    closeSearch.innerHTML = "&#128473;";
    searchWrapper.textContent = "Search:";
    searchWrapper.append(inputSearch, closeSearch, btnSearch);

    const filterWrapper: HTMLElement = document.createElement("div");
    const filterTitle: HTMLElement = document.createElement("p");
    const filterSelect: HTMLSelectElement = document.createElement("select");
    const filterOptionReset = document.createElement("option");
    const filterOptionLactoseYes: HTMLOptionElement =
      document.createElement("option");
    const filterOptionLactoseNo: HTMLOptionElement =
      document.createElement("option");
    filterWrapper.classList.add("catalog__filter-wrapper");
    filterTitle.classList.add("catalog__filter-title");
    filterSelect.classList.add("catalog__filter-select");
    filterOptionReset.classList.add("catalog__filter-reset");
    filterOptionLactoseYes.classList.add("catalog__filter-yes");
    filterOptionLactoseNo.classList.add("catalog__filter-no");
    filterTitle.innerText = "Filter:";
    filterOptionReset.innerText = "Reset filter";
    filterOptionLactoseYes.innerText = "With lactose";
    filterOptionLactoseNo.innerText = "Lactose free";
    filterSelect.append(
      filterOptionReset,
      filterOptionLactoseYes,
      filterOptionLactoseNo,
    );
    filterWrapper.append(filterTitle, filterSelect);

    const sortWrapper: HTMLElement = document.createElement("div");
    const sortTitle: HTMLElement = document.createElement("p");
    const sortSelect: HTMLSelectElement = document.createElement("select");
    const sortOptionReset: HTMLOptionElement = document.createElement("option");
    const sortOptionAlphabetically: HTMLOptionElement =
      document.createElement("option");
    const sortOptionPriceAscending: HTMLOptionElement =
      document.createElement("option");
    const sortOptionPriceDescending: HTMLOptionElement =
      document.createElement("option");
    sortWrapper.classList.add("catalog__sort-wrapper");
    sortTitle.classList.add("catalog__sort-title");
    sortSelect.classList.add("catalog__sort-select");
    sortOptionReset.classList.add("catalog__sort-reset");
    sortOptionAlphabetically.classList.add("catalog__sort-alphabetically");
    sortOptionPriceAscending.classList.add("catalog__sort-ascending");
    sortOptionPriceDescending.classList.add("catalog__sort-descending");
    sortTitle.innerText = "Sort:";
    sortOptionReset.innerText = "Reset sort";
    sortOptionAlphabetically.innerText = "A-Z";
    sortOptionPriceAscending.innerText = "Price ascending";
    sortOptionPriceDescending.innerText = "Price descending";
    sortSelect.append(
      sortOptionReset,
      sortOptionAlphabetically,
      sortOptionPriceAscending,
      sortOptionPriceDescending,
    );
    sortWrapper.append(sortTitle, sortSelect);
    menuWrapper.append(searchWrapper, filterWrapper, sortWrapper);
    mainWrapper.append(
      caption,
      navigationWrapper,
      categoriesWrapper,
      menuWrapper,
      productWrapper,
    );

    const indexCategories: number = 9;
    localStorage.setItem("indexCategories", `${indexCategories}`);
    const cardProducts: ProductProjection[] = (
      await this.products.getProducts(
        (await this.queryArgs.getQueryArgs(indexCategories)).productsAll,
      )
    ).body.results;
    this.addCardProductsToPage(cardProducts, productWrapper);
    this.clickNavigation(
      navigationWrapper,
      productWrapper,
      optionSushi,
      optionDesserts,
      optionDrinks,
      optionDrinksReset,
      optionDessertsReset,
      optionSushiReset,
      navigationCategories,
      navigationSubcategories,
      sortOptionReset,
      filterOptionReset,
      inputSearch,
    );
    this.changeFilter(
      filterSelect,
      productWrapper,
      sortOptionReset,
      inputSearch,
    );
    this.changeSort(sortSelect, productWrapper, filterOptionReset, inputSearch);
    this.clickSearch(btnSearch, closeSearch, productWrapper, inputSearch);
    this.changeCategories(
      productWrapper,
      sushiSelectElement,
      dessertSelectElement,
      drinksSelectElement,
      optionDrinksReset,
      optionDessertsReset,
      optionSushiReset,
      navigationCategories,
      navigationSubcategories,
      sortOptionReset,
      filterOptionReset,
      inputSearch,
    );
    return mainWrapper;
  }

  addCardProductsToPage(
    cardProducts: ProductProjection[],
    productWrapper: HTMLDivElement,
  ): void {
    cardProducts.forEach((product) => {
      const productCard = this.createCardProduct(product);
      // this.events.clickToBasketOnDetailedCard(productCard);
      productWrapper.append(productCard);
      this.events.clickProductCard(productCard);
    });
  }

  clickNavigation(
    navigationWrapper: HTMLUListElement,
    productWrapper: HTMLDivElement,
    optionSushi: HTMLOptionElement,
    optionDesserts: HTMLOptionElement,
    optionDrinks: HTMLOptionElement,
    optionDrinksReset: HTMLOptionElement,
    optionDessertsReset: HTMLOptionElement,
    optionSushiReset: HTMLOptionElement,
    navigationCategories: HTMLLIElement,
    navigationSubcategories: HTMLLIElement,
    sortOptionReset: HTMLOptionElement,
    filterOptionReset: HTMLOptionElement,
    inputSearch: HTMLInputElement,
  ): void {
    navigationWrapper.addEventListener("click", async (event) => {
      inputSearch.value = "";
      sortOptionReset.selected = true;
      filterOptionReset.selected = true;
      const currentElement: HTMLElement = event.target as HTMLElement;
      if (currentElement.textContent === "Catalog") {
        const indexCategories: number = 9;
        localStorage.setItem("indexCategories", `${indexCategories}`);
        productWrapper.innerHTML = "";
        optionDrinksReset.selected = true;
        optionDessertsReset.selected = true;
        optionSushiReset.selected = true;
        navigationCategories.textContent = "";
        navigationSubcategories.textContent = "";
        const cardProductsAll: ProductProjection[] = (
          await this.products.getProducts(
            (await this.queryArgs.getQueryArgs(indexCategories)).productsAll,
          )
        ).body.results;
        this.addCardProductsToPage(cardProductsAll, productWrapper);
      }
      if (currentElement.textContent === "/ Sushi") {
        const indexCategories: number = 0;
        localStorage.setItem("indexCategories", `${indexCategories}`);
        productWrapper.innerHTML = "";
        optionSushi.selected = true;
        navigationSubcategories.textContent = "";
        const cardCategories: ProductProjection[] = (
          await this.products.getProducts(
            (await this.queryArgs.getQueryArgsCategories(indexCategories))
              .categoriesSushi,
          )
        ).body.results;
        this.addCardProductsToPage(cardCategories, productWrapper);
      }
      if (currentElement.textContent === "/ Desserts") {
        const indexCategories: number = 1;
        localStorage.setItem("indexCategories", `${indexCategories}`);
        productWrapper.innerHTML = "";
        optionDesserts.selected = true;
        navigationSubcategories.textContent = "";
        const cardCategories: ProductProjection[] = (
          await this.products.getProducts(
            (await this.queryArgs.getQueryArgsCategories(indexCategories))
              .categoriesSushi,
          )
        ).body.results;
        this.addCardProductsToPage(cardCategories, productWrapper);
      }
      if (currentElement.textContent === "/ Drinks") {
        const indexCategories: number = 2;
        localStorage.setItem("indexCategories", `${indexCategories}`);
        productWrapper.innerHTML = "";
        optionDrinks.selected = true;
        navigationSubcategories.textContent = "";
        const cardCategories: ProductProjection[] = (
          await this.products.getProducts(
            (await this.queryArgs.getQueryArgsCategories(indexCategories))
              .categoriesSushi,
          )
        ).body.results;
        this.addCardProductsToPage(cardCategories, productWrapper);
      }
    });
  }

  changeFilter(
    filterSelect: HTMLSelectElement,
    productWrapper: HTMLDivElement,
    sortOptionReset: HTMLOptionElement,
    inputSearch: HTMLInputElement,
  ): void {
    filterSelect?.addEventListener("change", async () => {
      const indexCategories: number = Number(
        localStorage.getItem("indexCategories"),
      ) as number;
      productWrapper.innerHTML = "";
      inputSearch.value = "";
      const filterItem: HTMLOptionElement =
        filterSelect.options[filterSelect.selectedIndex];
      sortOptionReset.selected = true;
      if (filterItem.text === "Reset filter") {
        const cardProductsFilterAll: ProductProjection[] = (
          await this.products.getProducts(
            (await this.queryArgs.getQueryArgs(indexCategories)).productsAll,
          )
        ).body.results;
        this.addCardProductsToPage(cardProductsFilterAll, productWrapper);
      }
      if (filterItem.text === "With lactose") {
        const cardProductsFilterLactoseYes: ProductProjection[] = (
          await this.products.getProducts(
            (await this.queryArgs.getQueryArgs(indexCategories))
              .filterLactoseYes,
          )
        ).body.results;
        this.addCardProductsToPage(
          cardProductsFilterLactoseYes,
          productWrapper,
        );
      }
      if (filterItem.text === "Lactose free") {
        const cardProductsFilterLactoseNo: ProductProjection[] = (
          await this.products.getProducts(
            (await this.queryArgs.getQueryArgs(indexCategories))
              .filterLactoseNo,
          )
        ).body.results;
        this.addCardProductsToPage(cardProductsFilterLactoseNo, productWrapper);
      }
    });
  }

  changeSort(
    sortSelect: HTMLSelectElement,
    productWrapper: HTMLDivElement,
    filterOptionReset: HTMLOptionElement,
    inputSearch: HTMLInputElement,
  ): void {
    sortSelect?.addEventListener("change", async () => {
      const indexCategories: number = Number(
        localStorage.getItem("indexCategories"),
      ) as number;
      inputSearch.value = "";
      productWrapper.innerHTML = "";
      const sortItem: HTMLOptionElement =
        sortSelect.options[sortSelect.selectedIndex];
      filterOptionReset.selected = true;
      if (sortItem.text === "Reset sort") {
        const cardProductsSortReset: ProductProjection[] = (
          await this.products.getProducts(
            (await this.queryArgs.getQueryArgs(indexCategories)).productsAll,
          )
        ).body.results;
        this.addCardProductsToPage(cardProductsSortReset, productWrapper);
      }
      if (sortItem.text === "A-Z") {
        const cardProductsSortAz: ProductProjection[] = (
          await this.products.getProducts(
            (await this.queryArgs.getQueryArgs(indexCategories))
              .sortAlphabetically,
          )
        ).body.results;
        this.addCardProductsToPage(cardProductsSortAz, productWrapper);
      }
      if (sortItem.text === "Price ascending") {
        const cardProductsSortAz: ProductProjection[] = (
          await this.products.getProducts(
            (await this.queryArgs.getQueryArgs(indexCategories)).sortAscending,
          )
        ).body.results;
        this.addCardProductsToPage(cardProductsSortAz, productWrapper);
      }
      if (sortItem.text === "Price descending") {
        const cardProductsSortAz: ProductProjection[] = (
          await this.products.getProducts(
            (await this.queryArgs.getQueryArgs(indexCategories)).sortDescending,
          )
        ).body.results;
        this.addCardProductsToPage(cardProductsSortAz, productWrapper);
      }
    });
  }

  clickSearch(
    btnSearch: HTMLButtonElement,
    closeSearch: HTMLDivElement,
    productWrapper: HTMLDivElement,
    inputSearch: HTMLInputElement,
  ): void {
    btnSearch?.addEventListener("click", async () => {
      const indexCategories: number = Number(
        localStorage.getItem("indexCategories"),
      ) as number;
      productWrapper.innerHTML = "";
      const inputValue = inputSearch.value;
      const cardSearch: ProductProjection[] = (
        await this.products.getProducts(
          (await this.queryArgs.getQueryArgs(indexCategories, inputValue))
            .searchText,
        )
      ).body.results;
      this.addCardProductsToPage(cardSearch, productWrapper);
    });

    closeSearch?.addEventListener("click", async () => {
      const indexCategories: number = Number(
        localStorage.getItem("indexCategories"),
      ) as number;
      productWrapper.innerHTML = "";
      inputSearch.value = "";
      const cardProductsCloseSearch: ProductProjection[] = (
        await this.products.getProducts(
          (await this.queryArgs.getQueryArgs(indexCategories)).productsAll,
        )
      ).body.results;
      this.addCardProductsToPage(cardProductsCloseSearch, productWrapper);
    });
  }

  changeCategories(
    productWrapper: HTMLDivElement,
    sushiSelectElement: HTMLSelectElement,
    dessertSelectElement: HTMLSelectElement,
    drinksSelectElement: HTMLSelectElement,
    optionDrinksReset: HTMLOptionElement,
    optionDessertsReset: HTMLOptionElement,
    optionSushiReset: HTMLOptionElement,
    navigationCategories: HTMLLIElement,
    navigationSubcategories: HTMLLIElement,
    sortOptionReset: HTMLOptionElement,
    filterOptionReset: HTMLOptionElement,
    inputSearch: HTMLInputElement,
  ): void {
    sushiSelectElement?.addEventListener("change", async () => {
      inputSearch.value = "";
      optionDrinksReset.selected = true;
      optionDessertsReset.selected = true;
      sortOptionReset.selected = true;
      filterOptionReset.selected = true;
      productWrapper.innerHTML = "";
      const categoriesSushiItem =
        sushiSelectElement.options[sushiSelectElement.selectedIndex];
      if (categoriesSushiItem.text === "") {
        const indexCategories: number = 9;
        localStorage.setItem("indexCategories", `${indexCategories}`);
        navigationCategories.textContent = "";
        navigationSubcategories.textContent = "";
        const cardProductsFilterAll: ProductProjection[] = (
          await this.products.getProducts(
            (await this.queryArgs.getQueryArgs(indexCategories)).productsAll,
          )
        ).body.results;
        this.addCardProductsToPage(cardProductsFilterAll, productWrapper);
      }
      if (categoriesSushiItem.text === "Sushi") {
        const indexCategories: number = 0;
        localStorage.setItem("indexCategories", `${indexCategories}`);
        navigationCategories.textContent = "/ Sushi";
        navigationSubcategories.textContent = "";
        const cardCategories: ProductProjection[] = (
          await this.products.getProducts(
            (await this.queryArgs.getQueryArgsCategories(indexCategories))
              .categoriesSushi,
          )
        ).body.results;
        this.addCardProductsToPage(cardCategories, productWrapper);
      }
      if (categoriesSushiItem.text === " > Roll") {
        const indexCategories: number = 8;
        localStorage.setItem("indexCategories", `${indexCategories}`);
        navigationCategories.textContent = "/ Sushi";
        navigationSubcategories.textContent = "/ Roll";
        const cardCategories: ProductProjection[] = (
          await this.products.getProducts(
            (await this.queryArgs.getQueryArgsCategories(indexCategories))
              .categoriesSushi,
          )
        ).body.results;
        this.addCardProductsToPage(cardCategories, productWrapper);
      }
      if (categoriesSushiItem.text === " > Set") {
        const indexCategories: number = 3;
        localStorage.setItem("indexCategories", `${indexCategories}`);
        navigationCategories.textContent = "/ Sushi";
        navigationSubcategories.textContent = "/ Set";
        const cardCategories: ProductProjection[] = (
          await this.products.getProducts(
            (await this.queryArgs.getQueryArgsCategories(indexCategories))
              .categoriesSushi,
          )
        ).body.results;
        this.addCardProductsToPage(cardCategories, productWrapper);
      }
    });
    dessertSelectElement?.addEventListener("change", async () => {
      inputSearch.value = "";
      productWrapper.innerHTML = "";
      optionDrinksReset.selected = true;
      optionSushiReset.selected = true;
      sortOptionReset.selected = true;
      filterOptionReset.selected = true;
      const categoriesDessertsItem =
        dessertSelectElement.options[dessertSelectElement.selectedIndex];
      if (categoriesDessertsItem.text === "") {
        const indexCategories: number = 9;
        localStorage.setItem("indexCategories", `${indexCategories}`);
        navigationCategories.textContent = "";
        navigationSubcategories.textContent = "";
        const cardProductsFilterAll: ProductProjection[] = (
          await this.products.getProducts(
            (await this.queryArgs.getQueryArgs(indexCategories)).productsAll,
          )
        ).body.results;
        this.addCardProductsToPage(cardProductsFilterAll, productWrapper);
      }
      if (categoriesDessertsItem.text === "Desserts") {
        const indexCategories: number = 1;
        localStorage.setItem("indexCategories", `${indexCategories}`);
        navigationCategories.textContent = "/ Desserts";
        navigationSubcategories.textContent = "";
        const cardCategories: ProductProjection[] = (
          await this.products.getProducts(
            (await this.queryArgs.getQueryArgsCategories(indexCategories))
              .categoriesSushi,
          )
        ).body.results;
        this.addCardProductsToPage(cardCategories, productWrapper);
      }
      if (categoriesDessertsItem.text === " > Healthy food") {
        const indexCategories: number = 6;
        localStorage.setItem("indexCategories", `${indexCategories}`);
        navigationCategories.textContent = "/ Desserts";
        navigationSubcategories.textContent = "/ Healthy food";
        const cardCategories: ProductProjection[] = (
          await this.products.getProducts(
            (await this.queryArgs.getQueryArgsCategories(indexCategories))
              .categoriesSushi,
          )
        ).body.results;
        this.addCardProductsToPage(cardCategories, productWrapper);
      }
      if (categoriesDessertsItem.text === " > Usual dessert") {
        const indexCategories: number = 7;
        localStorage.setItem("indexCategories", `${indexCategories}`);
        navigationCategories.textContent = "/ Desserts";
        navigationSubcategories.textContent = "/ Usual dessert";
        const cardCategories: ProductProjection[] = (
          await this.products.getProducts(
            (await this.queryArgs.getQueryArgsCategories(indexCategories))
              .categoriesSushi,
          )
        ).body.results;
        this.addCardProductsToPage(cardCategories, productWrapper);
      }
    });
    drinksSelectElement?.addEventListener("change", async () => {
      inputSearch.value = "";
      productWrapper.innerHTML = "";
      optionDessertsReset.selected = true;
      optionSushiReset.selected = true;
      sortOptionReset.selected = true;
      filterOptionReset.selected = true;
      const categoriesDrinksItem =
        drinksSelectElement.options[drinksSelectElement.selectedIndex];
      if (categoriesDrinksItem.text === "") {
        const indexCategories: number = 9;
        localStorage.setItem("indexCategories", `${indexCategories}`);
        navigationCategories.textContent = "";
        navigationSubcategories.textContent = "";
        const cardProductsFilterAll: ProductProjection[] = (
          await this.products.getProducts(
            (await this.queryArgs.getQueryArgs(indexCategories)).productsAll,
          )
        ).body.results;
        this.addCardProductsToPage(cardProductsFilterAll, productWrapper);
      }
      if (categoriesDrinksItem.text === "Drinks") {
        const indexCategories: number = 2;
        localStorage.setItem("indexCategories", `${indexCategories}`);
        navigationCategories.textContent = "/ Drinks";
        navigationSubcategories.textContent = "";
        const cardCategories: ProductProjection[] = (
          await this.products.getProducts(
            (await this.queryArgs.getQueryArgsCategories(indexCategories))
              .categoriesSushi,
          )
        ).body.results;
        this.addCardProductsToPage(cardCategories, productWrapper);
      }
      if (categoriesDrinksItem.text === " > Soft drinks") {
        const indexCategories: number = 4;
        localStorage.setItem("indexCategories", `${indexCategories}`);
        navigationCategories.textContent = "/ Drinks";
        navigationSubcategories.textContent = "/ Soft drinks";
        const cardCategories: ProductProjection[] = (
          await this.products.getProducts(
            (await this.queryArgs.getQueryArgsCategories(indexCategories))
              .categoriesSushi,
          )
        ).body.results;
        this.addCardProductsToPage(cardCategories, productWrapper);
      }
      if (categoriesDrinksItem.text === " > Hot drinks") {
        const indexCategories: number = 5;
        localStorage.setItem("indexCategories", `${indexCategories}`);
        navigationCategories.textContent = "/ Drinks";
        navigationSubcategories.textContent = "/ Hot drinks";
        const cardCategories: ProductProjection[] = (
          await this.products.getProducts(
            (await this.queryArgs.getQueryArgsCategories(indexCategories))
              .categoriesSushi,
          )
        ).body.results;
        this.addCardProductsToPage(cardCategories, productWrapper);
      }
    });
  }

  createCardProduct(product: ProductProjection): HTMLElement {
    const card: HTMLElement = document.createElement("div");
    const title: HTMLElement = document.createElement("h2");
    const subtitle: HTMLElement = document.createElement("h4");
    const image: HTMLElement = document.createElement("div");
    const priceWrapper: HTMLElement = document.createElement("div");

    const firstPriceWrap: HTMLElement = document.createElement("div");
    firstPriceWrap.classList.add("catalog__first-price-wrap");
    const price: HTMLElement = document.createElement("h4");
    const toBasket: HTMLButtonElement = document.createElement("button");
    toBasket.classList.add(
      "catalog__to-basket-button",
      "catalog__first-basket",
    );
    firstPriceWrap.append(price, toBasket);

    const priceVariantWrap: HTMLElement = document.createElement("div");
    priceVariantWrap.classList.add("catalog__price-variant-wrap");
    const priceVariant: HTMLElement = document.createElement("h4");
    const toBasketTwo: HTMLButtonElement = document.createElement("button");
    toBasketTwo.classList.add(
      "catalog__to-basket-button",
      "catalog__second-basket",
    );

    priceVariantWrap.append(priceVariant, toBasketTwo);

    const priceVariantTwoWrap: HTMLElement = document.createElement("div");
    priceVariantTwoWrap.classList.add("catalog__price-variant-two-wrap");
    const priceVariantTwo: HTMLElement = document.createElement("h4");
    const toBasketThree: HTMLButtonElement = document.createElement("button");
    toBasketThree.classList.add(
      "catalog__to-basket-button",
      "catalog__third-basket",
    );

    priceVariantTwoWrap.append(priceVariantTwo, toBasketThree);

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

    toBasket.id = firstProductData.prices?.[0].id as string;

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
      toBasketTwo.id = secondProductData.prices?.[0].id as string;

      toBasketTwo.style.display = "block";
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
      toBasketThree.id = thirdProductData.prices?.[0].id as string;
      toBasketThree.style.display = "block";
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
    if (localStorage.getItem("objectCart")) {
      const cartsData: ClientResponse<Cart> = JSON.parse(
        localStorage.getItem("objectCart") as string,
      );
      toBasket.disabled = cartsData.body.lineItems.some(
        (item) => item.price.id === toBasket.id,
      );
      toBasketTwo.disabled = cartsData.body.lineItems.some(
        (item) => item.price.id === toBasketTwo.id,
      );
      toBasketThree.disabled = cartsData.body.lineItems.some(
        (item) => item.price.id === toBasketThree.id,
      );
    }
    priceWrapper.append(firstPriceWrap, priceVariantWrap, priceVariantTwoWrap);
    card.append(title, image, subtitle, priceWrapper);
    return card;
  }
}

export default CatalogPage;
