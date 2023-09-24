import { pagePaths } from "../../routes/routes";

class ErrorPage {
  render(): HTMLElement {
    const mainWrapper: HTMLElement = document.createElement("div");

    mainWrapper.classList.add("error");
    const caption: HTMLElement = document.createElement("h2");
    const anchorToMain: HTMLAnchorElement = document.createElement("a");
    anchorToMain.href = pagePaths.mainPath;
    anchorToMain.innerText = "Click here to Main!";
    anchorToMain.classList.add("error__anchor-to-main");

    caption.classList.add("error__caption");
    mainWrapper.innerHTML = "";
    mainWrapper.append(caption, anchorToMain);
    caption.innerText = `OOOps!!! Page with URL: (${window.location.href}) not found!!!`;
    return mainWrapper;
  }
}

export default ErrorPage;
