import Main from "../main/main";
import { expect, describe, test } from "@jest/globals";

describe("test: render main function return HTMLElement", () => {
  const main: Main = new Main();
  const testHtml: HTMLElement = document.createElement("div");
  const result: HTMLElement = document.createElement("main");
  result.className = "main";

  test("Test1", () => {
    expect(result).toStrictEqual(main.render(testHtml));
  });
});
