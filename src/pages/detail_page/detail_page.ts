import "./detail_page.scss";

class DetailPage {
  render(): HTMLElement {
    const mainWrapper: HTMLElement = document.createElement("div");

    mainWrapper.classList.add("detail");
    const caption: HTMLElement = document.createElement("h2");
    caption.classList.add("detail__caption");
    mainWrapper.innerHTML = "";
    mainWrapper.appendChild(caption);
    caption.innerText = "Detailed Product page";
    return mainWrapper;
  }
}

export default DetailPage;
