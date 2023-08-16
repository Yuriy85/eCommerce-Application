import "./main_page.scss";

class MainPage {
  render(): HTMLElement {
    const mainWrapper: HTMLElement = document.createElement("div");

    mainWrapper.classList.add("main__wrapper");
    const caption: HTMLElement = document.createElement("h2");
    caption.classList.add("main__main-caption");
    mainWrapper.innerHTML = "";
    mainWrapper.appendChild(caption);
    caption.innerText = "Main page";
    return mainWrapper;
  }
}

export default MainPage;
