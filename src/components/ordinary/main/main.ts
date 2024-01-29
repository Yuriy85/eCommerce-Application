class Main {
  render(parentNode: HTMLElement): HTMLElement {
    const main = document.createElement("main");
    main.classList.add("main");
    parentNode.appendChild(main);
    return main;
  }
}

export default Main;
