import "./profile_page.scss";

class ProfilePage {
  render(): HTMLElement {
    const mainWrapper: HTMLElement = document.createElement("div");

    mainWrapper.classList.add("profile");
    const caption: HTMLElement = document.createElement("h2");
    caption.classList.add("profile__caption");
    mainWrapper.innerHTML = "";
    mainWrapper.appendChild(caption);
    caption.innerText = "User Profile page";
    return mainWrapper;
  }
}

export default ProfilePage;
