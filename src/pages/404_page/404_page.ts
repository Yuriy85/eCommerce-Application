import "./404_page.scss";
import { pagePaths } from "../../routes/routes";

class ErrorPage {
  render(): HTMLElement {
    const mainWrapper: HTMLElement = document.createElement("div");

    mainWrapper.classList.add("main__wrapper");
    mainWrapper.classList.add("main__wrapper--404");
    const caption: HTMLElement = document.createElement("h2");
    const anchorToMain: HTMLAnchorElement = document.createElement("a");
    anchorToMain.href = pagePaths.mainPath;
    anchorToMain.innerText = "Click here to Main!";
    anchorToMain.classList.add("main__anchor-to-main");

    caption.classList.add("main__404-caption");
    mainWrapper.innerHTML = "";
    mainWrapper.append(caption, anchorToMain);
    caption.innerText = `OOOps!!! Page with URL: (${window.location.href}) not found!!!`;
    return mainWrapper;
  }
}

export default ErrorPage;
