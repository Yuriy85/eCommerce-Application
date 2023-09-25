import Checks from "../controller/checks";
import { expect, describe, test } from "@jest/globals";

describe("test: checkEmail function return true | string", () => {
  const checks: Checks = new Checks();

  test("Test1", () => {
    expect(
      "Email: A properly formatted email address (e.g., example@email.com)!",
    ).toBe(checks.checkEmail("test"));
  });

  test("Test2", () => {
    expect(true).toBe(checks.checkEmail("test@test.test"));
  });
});

describe("test: checkPassword function return true | string", () => {
  const checks: Checks = new Checks();

  test("Test1", () => {
    expect(
      "Password: Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number!",
    ).toBe(checks.checkPassword("test"));
  });

  test("Test2", () => {
    expect(true).toBe(checks.checkPassword("testTest1"));
  });
});

describe("test: checkNameSurnameCity function return true | string", () => {
  const checks: Checks = new Checks();

  test("Test1", () => {
    expect("Name must not contain leading or trailing whitespace.").toBe(
      checks.checkNameSurnameCity(" 1", "Name"),
    );
  });

  test("Test2", () => {
    expect(true).toBe(checks.checkNameSurnameCity("Test", "Surname"));
  });
});

describe("test: checkStreet function return true | string", () => {
  const checks: Checks = new Checks();

  test("Test1", () => {
    expect("Street: Must contain at least one character!").toBe(
      checks.checkStreet("", "billing"),
    );
  });

  test("Test2", () => {
    expect(true).toBe(checks.checkStreet("Test", "shipping"));
  });
});

describe("test: checkPostCode function return true | string", () => {
  const checks: Checks = new Checks();

  test("Test1", () => {
    expect(
      "Post code: Must follow the format for the country (e.g., 212029 or 00199 for the Belarus and Italy, respectively)!",
    ).toBe(checks.checkPostCode("Test", "billing", "Test"));
  });

  test("Test2", () => {
    expect(true).toBe(checks.checkPostCode("11111", "shipping", "Italy"));
  });
});

describe("test: checkDate function return true | string", () => {
  const checks: Checks = new Checks();

  test("Test1", () => {
    expect("Sorry, your age is under thirteen").toBe(checks.checkDate("Test"));
  });

  test("Test2", () => {
    expect(true).toBe(checks.checkDate("1985-05-18"));
  });
});

describe("test: printErrors function return HTMLElement", () => {
  const checks: Checks = new Checks();
  const testHtml: HTMLElement = document.createElement("div");
  const result: HTMLElement = document.createElement("div");
  result.innerText = "Test";

  test("Test1", () => {
    expect(result).toStrictEqual(checks.printErrors(testHtml, "Test"));
  });
});
