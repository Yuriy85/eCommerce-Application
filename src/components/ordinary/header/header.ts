import "./header.scss";
import catalogImg from "../../../assets/icons/catalog.svg";
import profileImg from "../../../assets/icons/profile.svg";
import loginImg from "../../../assets/icons/login.svg";
import logoutImg from "../../../assets/icons/logout.svg";
import registerImg from "../../../assets/icons/register.svg";
import basketImg from "../../../assets/icons/basket.svg";
import aboutImg from "../../../assets/icons/about.svg";
import { pagePaths } from "../../../routes/routes";
import Events from "../../../controller/events";

class Header {
  header: HTMLElement;
  events: Events;

  constructor() {
    this.header = document.createElement("header");
    this.events = new Events();
  }

  createButton(
    imgSvg: string,
    name: string,
    href: string,
    id?: string,
  ): HTMLAnchorElement {
    const button = document.createElement("a");
    const buttonImg = document.createElement("img");
    const buttonTitle = document.createElement("span");
    button.id = id ? `${id}-btn` : "";
    button.classList.add("header__button");
    buttonImg.classList.add("header__button-img");
    buttonTitle.classList.add("header__button-title");
    button.appendChild(buttonImg);
    button.appendChild(buttonTitle);
    buttonImg.src = imgSvg;
    buttonImg.id = id ? `${id}-img` : "";
    buttonTitle.innerText = name;
    buttonTitle.id = id ? `${id}-title` : "";
    if (!id) {
      button.href = href;
    }
    return button;
  }

  render(parentNode: HTMLElement): void {
    const wrapper: HTMLElement = document.createElement("div");
    const caption: HTMLElement = document.createElement("h1");
    const userMenu: HTMLElement = document.createElement("div");
    const loginButton = this.createButton(
      loginImg,
      "Login",
      pagePaths.loginPath,
      "log",
    );
    caption.title = " go to main";
    wrapper.classList.add("header__wrapper");
    caption.classList.add("header__caption");
    userMenu.classList.add("header__user-menu");
    caption.innerText = "eSushi";
    wrapper.appendChild(caption);
    wrapper.appendChild(userMenu);
    userMenu.append(
      this.createButton(catalogImg, "Catalog", pagePaths.catalogPath),
      this.createButton(profileImg, "Profile", pagePaths.profilePath),
      loginButton,
      this.createButton(registerImg, "Register", pagePaths.registerPath),
      this.createButton(basketImg, "Basket", pagePaths.basketPath),
      this.createButton(aboutImg, "About Us", pagePaths.aboutPath),
    );
    this.header.classList.add("header");
    this.header.appendChild(wrapper);
    parentNode.appendChild(this.header);

    this.events.clickPageAnchor(loginButton, pagePaths.loginPath);

    if (localStorage.getItem("id")) {
      this.changeLoginIcon("in");
    }
  }

  changeLoginIcon(method?: "in") {
    const loginImage: HTMLImageElement = document.getElementById(
      "log-img",
    ) as HTMLImageElement;
    const loginTitle: HTMLSpanElement = document.getElementById(
      "log-title",
    ) as HTMLSpanElement;
    loginTitle.innerText = method ? "Logout" : "login";
    loginImage.src = method ? logoutImg : loginImg;
  }
}

export default Header;
