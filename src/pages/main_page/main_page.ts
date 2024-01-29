import "./main_page.scss";
import Events from "../../controller/events";
import { pagePaths } from "../../routes/routes";

class MainPage {
  events: Events;

  constructor() {
    this.events = new Events();
  }

  render(): HTMLElement {
    const mainWrapper: HTMLElement = document.createElement("div");
    mainWrapper.classList.add("main-page");
    mainWrapper.innerHTML = "";

    const caption: HTMLElement = document.createElement("h2");
    caption.classList.add("main-page__caption");
    caption.innerText = "Main page";

    const linksToPages: HTMLUListElement = document.createElement("ul");
    linksToPages.classList.add("main-page__links-to-pages");

    const linkToCatalog: HTMLLIElement = document.createElement("li");
    linkToCatalog.classList.add("main-page__link");
    linkToCatalog.title = "Go to catalog";
    linkToCatalog.innerHTML = "Catalog";

    const linkToProfile: HTMLLIElement = document.createElement("li");
    linkToProfile.classList.add("main-page__link");
    linkToProfile.title = "Go to profile";
    linkToProfile.innerHTML = "Profile";

    const linkToLogin: HTMLLIElement = document.createElement("li");
    linkToLogin.classList.add("main-page__link");
    linkToLogin.title = "Go to login";
    linkToLogin.innerHTML = "Login";

    const linkToRegister: HTMLLIElement = document.createElement("li");
    linkToRegister.classList.add("main-page__link");
    linkToRegister.title = "Go to register";
    linkToRegister.innerHTML = "Register";

    const linkToBasket: HTMLLIElement = document.createElement("li");
    linkToBasket.classList.add("main-page__link");
    linkToBasket.title = "Go to basket";
    linkToBasket.innerHTML = "Basket";

    const linkToAbout: HTMLLIElement = document.createElement("li");
    linkToAbout.classList.add("main-page__link");
    linkToAbout.title = "Go to about";
    linkToAbout.innerHTML = "About Us";

    const codeSushiSet: HTMLElement = document.createElement("p");
    const codeDrinkSoft: HTMLElement = document.createElement("p");
    codeSushiSet.classList.add("main-page__promo");
    codeDrinkSoft.classList.add("main-page__promo");
    codeSushiSet.textContent = "Promo code 20% for sushi set - sushiset";
    codeDrinkSoft.textContent = "Promo code 10% for soft drink - drinksoft";

    linksToPages.append(
      linkToCatalog,
      linkToProfile,
      linkToLogin,
      linkToRegister,
      linkToBasket,
      linkToAbout,
      codeSushiSet,
      codeDrinkSoft,
    );
    mainWrapper.append(caption, linksToPages);

    this.events.clickPageAnchor(linkToCatalog, pagePaths.catalogPath);
    this.events.clickPageAnchor(linkToProfile, pagePaths.profilePath);
    this.events.clickPageAnchor(linkToLogin, pagePaths.loginPath);
    this.events.clickPageAnchor(linkToRegister, pagePaths.registerPath);
    this.events.clickPageAnchor(linkToBasket, pagePaths.basketPath);
    this.events.clickPageAnchor(linkToAbout, pagePaths.aboutPath);

    return mainWrapper;
  }
}

export default MainPage;
