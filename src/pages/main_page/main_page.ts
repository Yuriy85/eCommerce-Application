import "./main_page.scss";
import { pagePaths } from "../../routes/routes";

class MainPage {
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
    linkToCatalog.innerHTML = `<a href = "${pagePaths.catalogPath}">Go to catalog</a>`;

    const linkToDetail: HTMLLIElement = document.createElement("li");
    linkToDetail.classList.add("main-page__link");
    linkToDetail.innerHTML = `<a href = "${pagePaths.detailedPath}">Go to detailed</a>`;

    const linkToProfile: HTMLLIElement = document.createElement("li");
    linkToProfile.classList.add("main-page__link");
    linkToProfile.innerHTML = `<a href = "${pagePaths.profilePath}">Go to profile</a>`;

    const linkToLogin: HTMLLIElement = document.createElement("li");
    linkToLogin.classList.add("main-page__link");
    linkToLogin.innerHTML = `<a href = "${pagePaths.loginPath}">Go to login</a>`;

    const linkToRegister: HTMLLIElement = document.createElement("li");
    linkToRegister.classList.add("main-page__link");
    linkToRegister.innerHTML = `<a href = "${pagePaths.registerPath}">Go to register</a>`;

    const linkToBasket: HTMLLIElement = document.createElement("li");
    linkToBasket.classList.add("main-page__link");
    linkToBasket.innerHTML = `<a href = "${pagePaths.basketPath}">Go to basket</a>`;

    const linkToAbout: HTMLLIElement = document.createElement("li");
    linkToAbout.classList.add("main-page__link");
    linkToAbout.innerHTML = `<a href = "${pagePaths.aboutPath}">Go to about us</a>`;

    linksToPages.append(
      linkToCatalog,
      linkToDetail,
      linkToProfile,
      linkToLogin,
      linkToRegister,
      linkToBasket,
      linkToAbout,
    );
    mainWrapper.append(caption, linksToPages);
    return mainWrapper;
  }
}

export default MainPage;
