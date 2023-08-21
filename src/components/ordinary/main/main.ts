import "./main.scss";

class Main {
  main: HTMLElement;
  constructor() {
    this.main = document.createElement("main");
  }

  render(parentNode: HTMLElement): void {
    this.main.classList.add("main");
    parentNode.appendChild(this.main);
  }
}

export default Main;
