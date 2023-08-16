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
import { pageRoutes } from "./routes/routes";

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
  }

  run(): void {
    this.header.render(this.body);
    this.main.render(this.body);
    this.footer.render(this.body);
    this.initRouter();
  }

  renderPage(path: string): void {
    let pageInnerData: HTMLElement = this.mainPage;
    if (pageRoutes.main.match(path)) {
      pageInnerData = this.mainPage;
    } else if (pageRoutes.catalog.match(path)) {
      pageInnerData = this.catalogPage;
    } else if (pageRoutes.detailed.match(path)) {
      pageInnerData = this.detailPage;
    } else if (pageRoutes.profile.match(path)) {
      pageInnerData = this.profilePage;
    } else if (pageRoutes.login.match(path)) {
      pageInnerData = this.loginPage;
    } else if (pageRoutes.register.match(path)) {
      pageInnerData = this.registerPage;
    } else if (pageRoutes.basket.match(path)) {
      pageInnerData = this.basketPage;
    } else if (pageRoutes.about.match(path)) {
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
      this.renderPage(new URL(window.location.href).pathname);
    });
    document.querySelectorAll(".header__button").forEach((element) => {
      element.addEventListener("click", (event) => {
        event.preventDefault();
        const path = new URL((event.currentTarget as HTMLAnchorElement).href);
        this.goToPage(path.pathname);
      });
    });
    this.renderPage(new URL(window.location.href).pathname);
  }
}

export default App;
