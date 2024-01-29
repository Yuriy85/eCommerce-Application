import LoginPage from "../login_page/login_page";
import { expect, describe, test } from "@jest/globals";

describe("test: render LoginPage function return HTMLElement", () => {
  const loginPage: LoginPage = new LoginPage();
  const result: HTMLElement = document.createElement("div");
  result.className = "login";
  result.innerHTML =
    '<h2 class="login__caption"></h2><input class="login__input-log-email" placeholder="Enter email"><span class="login__email-error"></span><div class="login__password-wrapper"><input class="login__input-log-password" type="password" placeholder="Enter password"><span class="login__password-open-view"></span></div><span class="login__password-error"></span><button class="login__btn-login">Login</button><span class="login__error"></span><span class="login__choice"></span><a href="#register" class="login__anchor-to-register"><button class="login__btn-register">Go to register</button></a>';
  test("Test1", () => {
    expect(result).toStrictEqual(loginPage.render());
  });
});
