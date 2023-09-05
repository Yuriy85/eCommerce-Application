import "./basket_page.scss";

class RegisterPage {
  render(): HTMLElement {
    const mainWrapper: HTMLElement = document.createElement("div");

    mainWrapper.classList.add("basket");
    const caption: HTMLElement = document.createElement("h2");
    caption.classList.add("basket__caption");
    mainWrapper.innerHTML = "";
    mainWrapper.appendChild(caption);
    caption.innerText = "Basket page";
    return mainWrapper;
  }
}

export default RegisterPage;
