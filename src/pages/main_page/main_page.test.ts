import MainPage from "../main_page/main_page";
import { expect, describe, test } from "@jest/globals";

describe("test: render MainPage function return HTMLElement", () => {
  const mainPage: MainPage = new MainPage();
  const result: HTMLElement = document.createElement("div");
  result.className = "main-page";
  result.innerHTML =
    '<h2 class="main-page__caption"></h2><ul class="main-page__links-to-pages"><li class="main-page__link" title="Go to catalog">Catalog</li><li class="main-page__link" title="Go to profile">Profile</li><li class="main-page__link" title="Go to login">Login</li><li class="main-page__link" title="Go to register">Register</li><li class="main-page__link" title="Go to basket">Basket</li><li class="main-page__link" title="Go to about">About Us</li><p class="main-page__promo">Promo code 20% for sushi set - sushiset</p><p class="main-page__promo">Promo code 10% for soft drink - drinksoft</p></ul>';
  test("Test1", () => {
    expect(result).toStrictEqual(mainPage.render());
  });
});
