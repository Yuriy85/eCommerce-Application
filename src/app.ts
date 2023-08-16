import Header from "./components/ordinary/header/header";
import Main from "./components/ordinary/main/main";
import Footer from "./components/ordinary/footer/footer";
import MainPage from "./pages/main_page/main_page";
import CatalogPage from "./pages/catalog_page/catalog_page";
import DetailPage from "./pages/detail_page/detail_page";
import ProfilePage from "./pages/profile_page/profile_page";
import LoginPage from "./pages/login_page/login_page";
import RegisterPage from "./pages/register_page/register_page";
import BasketPage from "./pages/basket_page/basket_page";
import AboutPage from "./pages/about_page/about_page";
import ErrorPage from "./pages/404_page/404_page";
import { pagePaths } from "./routes/routes";
import Events from "./controller/events";

class App {
  body: HTMLElement;
  header: Header;
  main: Main;
  footer: Footer;
  mainPage: HTMLElement;
  catalogPage: HTMLElement;
  detailPage: HTMLElement;
  profilePage: HTMLElement;
  loginPage: HTMLElement;
  registerPage: HTMLElement;
  basketPage: HTMLElement;
  aboutPage: HTMLElement;
  errorPage: ErrorPage;
  events: Events;

  constructor() {
    this.body = document.body;
    this.header = new Header();
    this.main = new Main();
    this.footer = new Footer();
    this.mainPage = new MainPage().render();
    this.catalogPage = new CatalogPage().render();
    this.detailPage = new DetailPage().render();
    this.profilePage = new ProfilePage().render();
    this.loginPage = new LoginPage().render();
    this.registerPage = new RegisterPage().render();
    this.basketPage = new BasketPage().render();
    this.aboutPage = new AboutPage().render();
    this.errorPage = new ErrorPage();
    this.events = new Events();
  }

  run(): void {
    this.header.render(this.body);
    this.main.render(this.body);
    this.footer.render(this.body);
    this.initRouter();
    this.events.clickButtonLogin();
  }

  renderPage(path: string): void {
    let pageInnerData: HTMLElement = this.errorPage.render();
    if (path === pagePaths.mainPath || path === "") {
      pageInnerData = this.mainPage;
    } else if (path === pagePaths.catalogPath) {
      pageInnerData = this.catalogPage;
    } else if (path === pagePaths.detailedPath) {
      pageInnerData = this.detailPage;
    } else if (path === pagePaths.profilePath) {
      pageInnerData = this.profilePage;
    } else if (path === pagePaths.loginPath) {
      pageInnerData = this.loginPage;
    } else if (path === pagePaths.registerPath) {
      pageInnerData = this.registerPage;
    } else if (path === pagePaths.basketPath) {
      pageInnerData = this.basketPage;
    } else if (path === pagePaths.aboutPath) {
      pageInnerData = this.aboutPage;
    }
    (document.querySelector(".main") as HTMLElement).innerHTML = "";
    (document.querySelector(".main") as HTMLElement).appendChild(pageInnerData);
  }

  goToPage(path: string): void {
    window.history.pushState({ path }, path, path);
    this.renderPage(path);
  }

  initRouter() {
    window.addEventListener("popstate", () => {
      this.renderPage(new URL(window.location.href).hash);
    });
    document
      .querySelector(".header__caption")
      ?.addEventListener("click", () => {
        this.goToPage(pagePaths.mainPath);
      });
    this.renderPage(new URL(window.location.href).hash);
  }
}

export default App;
