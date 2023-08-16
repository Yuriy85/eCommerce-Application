import "./header.scss";
import catalogImg from "../../../assets/icons/catalog.svg";
import detailedImg from "../../../assets/icons/detailed.svg";
import profileImg from "../../../assets/icons/profile.svg";
import loginImg from "../../../assets/icons/login.svg";
import registerImg from "../../../assets/icons/register.svg";
import basketImg from "../../../assets/icons/basket.svg";
import aboutImg from "../../../assets/icons/about.svg";
import { pagePaths } from "../../../routes/routes";

class Header {
  header: HTMLElement;
  constructor() {
    this.header = document.createElement("header");
  }

  createButton(imgSvg: string, name: string, href: string): HTMLAnchorElement {
    const button = document.createElement("a");
    const buttonImg = document.createElement("img");
    const buttonTitle = document.createElement("span");
    button.classList.add("header__button");
    buttonImg.classList.add("header__button-img");
    buttonTitle.classList.add("header__button-title");
    button.appendChild(buttonImg);
    button.appendChild(buttonTitle);
    buttonImg.src = imgSvg;
    buttonTitle.innerText = name;
    button.href = href;
    return button;
  }

  render(parentNode: HTMLElement): void {
    const wrapper: HTMLElement = document.createElement("div");
    const caption: HTMLElement = document.createElement("h1");
    const userMenu: HTMLElement = document.createElement("div");
    caption.title = " go to main";
    wrapper.classList.add("header__wrapper");
    caption.classList.add("header__caption");
    userMenu.classList.add("header__user-menu");
    caption.innerText = "eCommerce";
    wrapper.appendChild(caption);
    wrapper.appendChild(userMenu);
    userMenu.appendChild(
      this.createButton(catalogImg, "Catalog", pagePaths.catalogPath),
    );
    userMenu.appendChild(
      this.createButton(detailedImg, "Detailed", pagePaths.detailedPath),
    );
    userMenu.appendChild(
      this.createButton(profileImg, "Profile", pagePaths.profilePath),
    );
    userMenu.appendChild(
      this.createButton(loginImg, "Login", pagePaths.loginPath),
    );
    userMenu.appendChild(
      this.createButton(registerImg, "Register", pagePaths.registerPath),
    );
    userMenu.appendChild(
      this.createButton(basketImg, "Basket", pagePaths.basketPath),
    );
    userMenu.appendChild(
      this.createButton(aboutImg, "About Us", pagePaths.aboutPath),
    );
    this.header.classList.add("header");
    this.header.appendChild(wrapper);
    parentNode.appendChild(this.header);
  }
}

export default Header;
