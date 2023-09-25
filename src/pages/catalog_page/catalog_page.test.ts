import CatalogPage from "../catalog_page/catalog_page";
import { expect, describe, test } from "@jest/globals";
import { ProductProjection } from "@commercetools/platform-sdk";

describe("test: render CatalogPage function return HTMLElement", () => {
  const catalogPage: CatalogPage = new CatalogPage();
  const result: HTMLElement = document.createElement("div");
  result.className = "catalog";
  result.innerHTML =
    '<h2 class="catalog__caption"></h2><ul class="catalog__nav-wrapper"><li class="catalog__nav-catalog">Catalog</li><li class="catalog__nav-categories"></li><li class="catalog__nav-subcategories"></li></ul><div class="catalog__categories-wrapper"><p></p><div class="catalog__categories-sushi-wrapper"><p></p><select class="catalog__categories-sushi-select"><option class="catalog__categories-dessert-reset"></option><option>Sushi</option><option>&nbsp;&gt; Roll</option><option>&nbsp;&gt; Set</option></select></div><div class="catalog__categories-desserts-wrapper"><p></p><select class="catalog__categories-dessert-select"><option class="catalog__categories-sushi-reset"></option><option>Desserts</option><option>&nbsp;&gt; Healthy food</option><option>&nbsp;&gt; Usual dessert</option></select></div><div class="catalog__categories-drinks-wrapper"><p></p><select class="catalog__categories-drinks-select"><option class="catalog__categories-drinks-reset"></option><option>Drinks</option><option>&nbsp;&gt; Soft drinks</option><option>&nbsp;&gt; Hot drinks</option></select></div></div><div class="catalog__menu-wrapper"><div class="catalog__search-wrapper">Search:<input class="catalog__search-select" type="text"><div class="catalog__search-close">🗙</div><button class="catalog__search-button">ок</button></div><div class="catalog__filter-wrapper"><p class="catalog__filter-title"></p><select class="catalog__filter-select"><option class="catalog__filter-reset"></option><option class="catalog__filter-yes"></option><option class="catalog__filter-no"></option></select></div><div class="catalog__sort-wrapper"><p class="catalog__sort-title"></p><select class="catalog__sort-select"><option class="catalog__sort-reset"></option><option class="catalog__sort-alphabetically"></option><option class="catalog__sort-ascending"></option><option class="catalog__sort-descending"></option></select></div></div><div class="catalog__products"><div class="catalog__card" id="undefined"><h2 class="catalog__card-title"></h2><div class="catalog__card-img" style="background-image: url(undefined);"></div><h4 class="catalog__card-subtitle"></h4><div class="catalog__price-wrapper"><div class="catalog__first-price-wrap"><h4 class="catalog__card-first-price">NaN € undefined</h4><button class="catalog__to-basket-button catalog__first-basket" id="undefined"></button></div><div class="catalog__price-variant-wrap"><h4 class="catalog__card-second-price">NaN € undefined</h4><button class="catalog__to-basket-button catalog__second-basket" id="undefined" style="display: block;"></button></div><div class="catalog__price-variant-two-wrap"><h4 class="catalog__card-third-price"></h4><button class="catalog__to-basket-button catalog__third-basket"></button></div></div></div></div><nav class="catalog__pagination"><div class="catalog__btn-pagination" style="background-color: blue;">1</div><div class="catalog__btn-pagination">2</div><div class="catalog__btn-pagination">3</div><div class="catalog__btn-pagination">4</div></nav>';
  test("Test1", async () => {
    const data = await catalogPage.render();
    expect(data).toStrictEqual(result);
  });
});

describe("test: showPagination function return boolean", () => {
  const catalogPage: CatalogPage = new CatalogPage();
  const testHtml1: HTMLElement = document.createElement("div");
  const testHtml2: HTMLElement = document.createElement("div");
  const testHtml3: HTMLElement = document.createElement("div");
  const testHtml4: HTMLElement = document.createElement("div");
  const testHtml5: HTMLElement = document.createElement("div");
  test("Test1", () =>
    expect(
      catalogPage.showPagination(
        testHtml1,
        testHtml2,
        testHtml3,
        testHtml4,
        testHtml5,
      ),
    ).toBe(true));
});

describe("test: createCardProduct function return HTMLElement", () => {
  const catalogPage: CatalogPage = new CatalogPage();
  const data: ProductProjection = {
    name: { Test: "Test" },
    masterVariant: { id: 1 },
    variants: [{ id: 1 }],
    id: "1",
    version: 1,
    createdAt: "1",
    lastModifiedAt: "1",
    productType: {
      typeId: "product-type",
      id: "1",
    },
    slug: { Test: "Test" },
    categories: [
      {
        typeId: "category",
        id: "1",
      },
    ],
  };
  const result: HTMLElement = document.createElement("div");
  result.className = "catalog__card";
  result.id = "1";
  result.innerHTML =
    '<h2 class="catalog__card-title"></h2><div class="catalog__card-img" style="background-image: url(undefined);"></div><h4 class="catalog__card-subtitle"></h4><div class="catalog__price-wrapper"><div class="catalog__first-price-wrap"><h4 class="catalog__card-first-price">NaN € undefined</h4><button class="catalog__to-basket-button catalog__first-basket" id="undefined"></button></div><div class="catalog__price-variant-wrap"><h4 class="catalog__card-second-price">NaN € undefined</h4><button class="catalog__to-basket-button catalog__second-basket" id="undefined" style="display: block;"></button></div><div class="catalog__price-variant-two-wrap"><h4 class="catalog__card-third-price"></h4><button class="catalog__to-basket-button catalog__third-basket"></button></div></div>';
  test("Test1", () =>
    expect(catalogPage.createCardProduct(data)).toStrictEqual(result));
});
