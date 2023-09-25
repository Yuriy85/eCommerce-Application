import DetailPage from "../detail_page/detail_page";
import { expect, describe, test } from "@jest/globals";

describe("test: render DetailPage function return HTMLElement", () => {
  const detailPage: DetailPage = new DetailPage();
  const result: HTMLElement = document.createElement("div");
  result.className = "detail";
  result.innerHTML =
    '<h2 class="detail__caption"></h2><div class="detail__wrapper" id="undefined"><div class="detail__image-slider"><button class="detail__left-slider"></button><div class="detail__img-button-wrapper"><div class="detail__image-wrapper" style="position: relative; overflow: hidden; display: block;"><div class="detail__image-two" style="background-image: url(undefined); position: absolute; z-index: 1; left: 0%;"></div><div class="detail__image-three" style="background-image: url(undefined); position: absolute; z-index: 0; left: -120%;"></div><div class="detail__image-one" style="background-image: url(undefined); position: absolute; z-index: 0; left: -120%;"></div></div><button class="detail__close-modal"></button></div><button class="detail__right-slider"></button></div><div class="detail__description"><p class="detail__main-description"></p><p class="detail__meta-description"></p><div class="detail__first-price-wrapper"><p class="detail__price">NaN € undefined</p><button class="detail__to-basket-button detail__first-basket" title="Add to cart" id="undefined"></button></div><div class="detail__second-price-wrapper"><p class="detail__price">NaN € undefined</p><button class="detail__to-basket-button detail__second-basket" title="Add to cart" id="undefined" style="display: block;"></button></div><div class="detail__third-price-wrapper"><p class="detail__price"></p><button class="detail__to-basket-button detail__third-basket" title="Add to cart"></button></div></div></div><button class="detail__to-catalog">Back to Catalog</button><div class="detail__modal"></div>';
  test("Test1", async () => {
    const data = await detailPage.render();
    expect(data).toStrictEqual(result);
  });
});
