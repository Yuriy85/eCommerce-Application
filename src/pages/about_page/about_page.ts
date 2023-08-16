import "./about_page.scss";

class AboutPage {
  render(): HTMLElement {
    const mainWrapper: HTMLElement = document.createElement("div");

    mainWrapper.classList.add("main__wrapper");
    const caption: HTMLElement = document.createElement("h2");
    caption.classList.add("main__about-caption");
    mainWrapper.innerHTML = "";
    mainWrapper.appendChild(caption);
    caption.innerText = "About Us page";
    return mainWrapper;
  }
}

export default AboutPage;
