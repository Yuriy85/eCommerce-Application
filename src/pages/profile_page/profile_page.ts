import "./profile_page.scss";

class ProfilePage {
  render(): HTMLElement {
    const mainWrapper: HTMLElement = document.createElement("div");

    mainWrapper.classList.add("main__wrapper");
    const caption: HTMLElement = document.createElement("h2");
    caption.classList.add("main__profile-caption");
    mainWrapper.innerHTML = "";
    mainWrapper.appendChild(caption);
    caption.innerText = "User Profile page";
    return mainWrapper;
  }
}

export default ProfilePage;
