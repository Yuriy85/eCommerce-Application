import AboutPage from "../404_page/404_page";
import { expect, describe, test } from "@jest/globals";

describe("test: render AboutPage function return HTMLElement", () => {
  const aboutPage: AboutPage = new AboutPage();
  const result: HTMLElement = document.createElement("div");
  result.className = "error";
  result.innerHTML =
    '<h2 class="error__caption"></h2><a class="error__anchor-to-main" href="#main"/>';
  test("Test1", () => {
    expect(result).toStrictEqual(aboutPage.render());
  });
});
