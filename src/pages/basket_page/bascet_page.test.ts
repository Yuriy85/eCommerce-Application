import BasketPage from "../basket_page/basket_page";
import { expect, describe, test } from "@jest/globals";

describe("test: render BasketPage function return HTMLElement", () => {
  const basketPage: BasketPage = new BasketPage();
  const result: HTMLElement = document.createElement("div");
  result.className = "basket";
  result.innerHTML =
    '<h2 class="basket__caption"></h2><div class="basket__wrapper" style="gap: 0px;"><div class="basket__left-wrapper"><div class="basket__empty-wrapper"><h3 class="basket__empty-massage"></h3><img class="basket__empty-image" src="undefined"><button class="basket__to-catalog"></button></div></div><div class="basket__right-wrapper"></div></div>';
  test("Test1", () => {
    expect(result).toStrictEqual(basketPage.render());
  });
});
