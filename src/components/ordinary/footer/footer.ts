class Footer {
  render(parentNode: HTMLElement): HTMLElement {
    const footer: HTMLElement = document.createElement("footer");
    const wrapper: HTMLElement = document.createElement("div");

    footer.classList.add("footer");
    wrapper.classList.add("footer__wrapper");
    footer.appendChild(wrapper);
    parentNode.appendChild(footer);
    return footer;
  }
}

export default Footer;
