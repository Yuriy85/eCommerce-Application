import ErrorPage from "../404_page/404_page";
import { expect, describe, test } from "@jest/globals";

describe("test: render 404_page function return HTMLElement", () => {
  const errorPage: ErrorPage = new ErrorPage();
  const result: HTMLElement = document.createElement("div");
  result.className = "error";
  result.innerHTML =
    '<h2 class="error__caption"></h2><a class="error__anchor-to-main" href="#main"/>';
  test("Test1", () => {
    expect(result).toStrictEqual(errorPage.render());
  });
});
