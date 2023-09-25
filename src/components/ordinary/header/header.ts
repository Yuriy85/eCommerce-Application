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
  events: Events;

  constructor() {
    this.events = new Events();
  }

  createButton(
    imgSvg: string,
    name: string,
    href: string,
    style: string,
    id?: string,
  ): HTMLAnchorElement {
    const button = document.createElement("a");
    const buttonImg = document.createElement("img");
    const buttonTitle = document.createElement("span");
    const buttonCount = document.createElement("span");
    button.id = id ? `${id}-btn` : "";
    button.classList.add("header__button");
    buttonImg.classList.add("header__button-img");
    buttonTitle.classList.add("header__button-title");
    buttonCount.classList.add("header__button-count");
    button.append(buttonImg, buttonCount, buttonTitle);
    buttonImg.src = imgSvg;
    buttonImg.id = id ? `${id}-img` : "";
    buttonTitle.innerText = name;
    buttonTitle.id = id ? `${id}-title` : "";
    buttonCount.style.display = style;
    buttonCount.textContent = Header.getCountOnBasketIcon(
      localStorage.getItem("countProductOnCart") as string,
    );
    buttonCount.id = id ? `${id}-count` : "";
    if (id !== "log") {
      button.href = href;
    }
    return button;
  }

  render(parentNode: HTMLElement): HTMLElement {
    const header: HTMLElement = document.createElement("header");
    const wrapper: HTMLElement = document.createElement("div");
    const caption: HTMLElement = document.createElement("h1");
    const userMenu: HTMLElement = document.createElement("div");
    const profileButton = this.createButton(
      profileImg,
      "Profile",
      pagePaths.profilePath,
      "none",
    );
    const loginButton = this.createButton(
      loginImg,
      "Login",
      pagePaths.loginPath,
      "none",
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
      this.createButton(catalogImg, "Catalog", pagePaths.catalogPath, "none"),
      profileButton,
      loginButton,
      this.createButton(
        registerImg,
        "Register",
        pagePaths.registerPath,
        "none",
      ),
      this.createButton(
        basketImg,
        "Basket",
        pagePaths.basketPath,
        "block",
        "basket",
      ),
      this.createButton(aboutImg, "About Us", pagePaths.aboutPath, "none"),
    );
    header.classList.add("header");
    header.appendChild(wrapper);
    parentNode.appendChild(header);

    this.events.clickPageAnchor(
      loginButton,
      pagePaths.loginPath,
      profileButton,
    );

    if (localStorage.getItem("id")) {
      this.changeLoginIcon(
        document.getElementById("log-img") as HTMLImageElement,
        document.getElementById("log-title") as HTMLSpanElement,
        "in",
      );
    } else {
      profileButton.classList.add("header__hide-element");
    }
    return header;
  }

  changeLoginIcon(
    loginImage: HTMLImageElement,
    loginTitle: HTMLSpanElement,
    method?: "in",
  ) {
    loginTitle.innerText = method ? "Logout" : "login";
    loginImage.src = method ? logoutImg : loginImg;
    return loginImage;
  }

  static getCountOnBasketIcon(countFromLocalStorage: string): string {
    return countFromLocalStorage === "0" ? "" : countFromLocalStorage;
  }
}

export default Header;
