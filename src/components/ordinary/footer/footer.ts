import "./footer.scss";

class Footer {
  footer: HTMLElement;
  constructor() {
    this.footer = document.createElement("footer");
  }

  render(parentNode: HTMLElement): void {
    const wrapper: HTMLElement = document.createElement("div");

    this.footer.classList.add("footer");
    wrapper.classList.add("footer__wrapper");
    this.footer.appendChild(wrapper);
    parentNode.appendChild(this.footer);
  }
}

export default Footer;
