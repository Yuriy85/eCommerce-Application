import Header from "../components/ordinary/header/header";
import Main from "../components/ordinary/main/main";
import Footer from "../components/ordinary/footer/footer";
import MainPage from "../pages/main_page/main_page";
import CatalogPage from "../pages/catalog_page/catalog_page";
import DetailPage from "../pages/detail_page/detail_page";
import ProfilePage from "../pages/profile_page/profile_page";
import LoginPage from "../pages/login_page/login_page";
import RegisterPage from "../pages/register_page/register_page";
import BasketPage from "../pages/basket_page/basket_page";
import AboutPage from "../pages/about_page/about_page";
import ErrorPage from "../pages/404_page/404_page";
import { pagePaths } from "../routes/routes";
import Products from "../controller/products";

class App {
  body: HTMLElement;
  header: Header;
  main: Main;
  footer: Footer;
  mainPage: HTMLElement;
  catalogPage: CatalogPage;
  detailPage: DetailPage;
  profilePage: ProfilePage;
  loginPage: HTMLElement;
  registerPage: HTMLElement;
  basketPage: BasketPage;
  aboutPage: HTMLElement;
  errorPage: ErrorPage;
  products: Products;

  constructor() {
    this.body = document.body;
    this.header = new Header();
    this.main = new Main();
    this.footer = new Footer();
    this.mainPage = new MainPage().render();
    this.catalogPage = new CatalogPage();
    this.detailPage = new DetailPage();
    this.profilePage = new ProfilePage();
    this.loginPage = new LoginPage().render();
    this.registerPage = new RegisterPage().render();
    this.basketPage = new BasketPage();
    this.aboutPage = new AboutPage().render();
    this.errorPage = new ErrorPage();
    this.products = new Products();
  }

  run(): void {
    this.header.render(this.body);
    this.main.render(this.body);
    this.footer.render(this.body);
    this.initRouter();
  }

  async renderPage(path: string): Promise<void> {
    const headerButtons: NodeListOf<Element> =
      document.querySelectorAll(".header__button");
    let pageInnerData: HTMLElement | Promise<HTMLElement> =
      this.errorPage.render();
    headerButtons.forEach((button) =>
      button.classList.remove("header__button--active"),
    );
    if (path === pagePaths.mainPath || path === "") {
      pageInnerData = this.mainPage;
    } else if (path === pagePaths.catalogPath) {
      headerButtons[0]?.classList.add("header__button--active");
      pageInnerData = await this.catalogPage.render();
    } else if (path.split("?")[0] === pagePaths.detailedPath) {
      pageInnerData = await this.detailPage.render();
    } else if (path === pagePaths.profilePath) {
      headerButtons[1]?.classList.add("header__button--active");
      pageInnerData = await this.profilePage.render();
    } else if (path === pagePaths.loginPath) {
      headerButtons[2]?.classList.add("header__button--active");
      pageInnerData = this.loginPage;
    } else if (path === pagePaths.registerPath) {
      headerButtons[3]?.classList.add("header__button--active");
      pageInnerData = this.registerPage;
    } else if (path === pagePaths.basketPath) {
      headerButtons[4]?.classList.add("header__button--active");
      pageInnerData = await this.basketPage.render();
    } else if (path === pagePaths.aboutPath) {
      headerButtons[5]?.classList.add("header__button--active");
      pageInnerData = this.aboutPage;
    }
    const main = document.querySelector(".main") as HTMLElement;
    main.innerHTML = "";
    main.append(pageInnerData);
  }

  goToPage(path: string, type?: "replace"): void {
    if (type) {
      window.history.replaceState({ path }, "", path);
    } else {
      window.history.pushState({ path }, "", path);
    }
    this.renderPage(path);
  }

  initRouter() {
    window.addEventListener("popstate", () => {
      if (
        !localStorage.getItem("id") &&
        new URL(window.location.href).hash.split("?")[0] ===
          pagePaths.profilePath
      ) {
        this.goToPage(pagePaths.loginPath, "replace");
      } else if (
        localStorage.getItem("id") &&
        new URL(window.location.href).hash === pagePaths.loginPath
      ) {
        this.goToPage(pagePaths.mainPath, "replace");
      } else {
        this.renderPage(new URL(window.location.href).hash);
      }
    });
    document
      .querySelector(".header__caption")
      ?.addEventListener("click", () => {
        this.goToPage(pagePaths.mainPath);
      });

    if (
      !localStorage.getItem("id") &&
      new URL(window.location.href).hash.split("?")[0] === pagePaths.profilePath
    ) {
      this.goToPage(pagePaths.loginPath, "replace");
    } else if (
      localStorage.getItem("id") &&
      new URL(window.location.href).hash === pagePaths.loginPath
    ) {
      this.goToPage(pagePaths.mainPath, "replace");
    } else {
      this.renderPage(new URL(window.location.href).hash);
    }
  }
}

export default App;
