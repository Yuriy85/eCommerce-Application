import Header from "../header/header";
import { expect, describe, test } from "@jest/globals";

describe("test: render header page function return HTMLElement", () => {
  const header: Header = new Header();
  const testHtml: HTMLElement = document.createElement("div");
  const result: HTMLElement = document.createElement("header");
  result.className = "header";
  result.innerHTML =
    '<div class="header__wrapper"><h1 title=" go to main" class="header__caption"></h1><div class="header__user-menu"><a id="" class="header__button" href="#catalog"><img class="header__button-img" src="undefined" id=""><span class="header__button-count" style="display: none;" id=""></span><span class="header__button-title" id=""></span></a><a id="" class="header__button header__hide-element" href="#profile"><img class="header__button-img" src="undefined" id=""><span class="header__button-count" style="display: none;" id=""></span><span class="header__button-title" id=""></span></a><a id="log-btn" class="header__button"><img class="header__button-img" src="undefined" id="log-img"><span class="header__button-count" style="display: none;" id="log-count"></span><span class="header__button-title" id="log-title"></span></a><a id="" class="header__button" href="#register"><img class="header__button-img" src="undefined" id=""><span class="header__button-count" style="display: none;" id=""></span><span class="header__button-title" id=""></span></a><a id="basket-btn" class="header__button" href="#basket"><img class="header__button-img" src="undefined" id="basket-img"><span class="header__button-count" style="display: block;" id="basket-count"></span><span class="header__button-title" id="basket-title"></span></a><a id="" class="header__button" href="#about"><img class="header__button-img" src="undefined" id=""><span class="header__button-count" style="display: none;" id=""></span><span class="header__button-title" id=""></span></a></div></div>';
  test("Test1", () => {
    expect(result).toStrictEqual(header.render(testHtml));
  });
});

describe("test: getCountOnBasketIcon function return string", () => {
  test("Test1", () => {
    expect("").toBe(Header.getCountOnBasketIcon("0"));
  });

  test("Test2", () => {
    expect("1").toBe(Header.getCountOnBasketIcon("1"));
  });
});

describe("test: changeLoginIcon function return HTMLElement", () => {
  const header: Header = new Header();
  const testHtml: HTMLImageElement = document.createElement("img");
  const test2Html: HTMLSpanElement = document.createElement("span");
  const result: HTMLImageElement = document.createElement("img");
  result.src = "undefined";
  test("Test1", () => {
    expect(result).toStrictEqual(header.changeLoginIcon(testHtml, test2Html));
  });
});

describe("test: createButton function return HTMLButtonElement", () => {
  const header: Header = new Header();
  const result: HTMLAnchorElement = document.createElement("a");
  result.className = "header__button";
  result.href = "Test";
  result.id = "";
  result.innerHTML =
    '<img class="header__button-img" src="Test" id=""><span class="header__button-count" style="display: Test;" id=""></span><span class="header__button-title" id=""></span>';

  test("Test1", () => {
    expect(result).toStrictEqual(
      header.createButton("Test", "Test", "Test", "Test"),
    );
  });
});
