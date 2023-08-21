import "./about_page.scss";

class AboutPage {
  render(): HTMLElement {
    const mainWrapper: HTMLElement = document.createElement("div");

    mainWrapper.classList.add("about");
    const caption: HTMLElement = document.createElement("h2");
    caption.classList.add("about__caption");
    mainWrapper.innerHTML = "";
    mainWrapper.appendChild(caption);
    caption.innerText = "About Us page";
    return mainWrapper;
  }
}

export default AboutPage;
