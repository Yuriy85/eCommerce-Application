import Footer from "../footer/footer";
import { expect, describe, test } from "@jest/globals";

describe("test: render footer function return HTMLElement", () => {
  const footer: Footer = new Footer();
  const testHtml: HTMLElement = document.createElement("div");
  const result: HTMLElement = document.createElement("footer");
  result.className = "footer";
  result.innerHTML = "<div class='footer__wrapper' />";

  test("Test1", () => {
    expect(result).toStrictEqual(footer.render(testHtml));
  });
});
