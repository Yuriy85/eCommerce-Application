import rssIcon from "../../assets/icons/rss.svg";

class AboutPage {
  render(): HTMLElement {
    const mainWrapper: HTMLElement = document.createElement("div");

    mainWrapper.classList.add("about");
    const caption: HTMLElement = document.createElement("h2");
    caption.classList.add("about__caption");
    mainWrapper.innerHTML = "";
    caption.innerText = "About Us page";

    const introduction: HTMLElement = document.createElement("h3");
    introduction.classList.add("about__introduction");
    introduction.innerText = `Hello there!

    We're Mikhail Kozarev, Yuriy Panteleev and Maria Panteleeva - TRUE OR FALSE team. 

    Each of us enjoys that way from Stage 0 to this final point! And we've created a really positive environment inside the team during the sprints of eCommerce task, so each member of our team feels comfortable and supported by one another throughout each step.`;

    const gratitude: HTMLElement = document.createElement("div");
    gratitude.classList.add("about__gratitude");
    const gratitudeText: HTMLElement = document.createElement("h3");
    gratitudeText.classList.add("about__gratitude-text");
    gratitudeText.innerText =
      "Naturally, we're truly grateful to every member of the RS School!";
    const logoRS: HTMLElement = document.createElement("a");
    logoRS.classList.add("about__logoRS");
    logoRS.setAttribute("href", "https://rs.school/");
    logoRS.setAttribute("target", "_blank");
    logoRS.innerHTML = `<img src= "${rssIcon}" style="height: 50px; padding-left: 20px; scale: 1.3"/>`;
    gratitudeText.append(logoRS);
    gratitude.append(gratitudeText);

    // MIKHAIL
    const blockMikhail: HTMLElement = document.createElement("div");
    blockMikhail.classList.add("about__Mikhail");
    const wrapperMikhail: HTMLElement = document.createElement("div");
    wrapperMikhail.classList.add("about__wrapper-Mikhail");
    const photoMikhail: HTMLElement = document.createElement("div");
    photoMikhail.classList.add("about__photo-mikhail");
    const aboutMikhailInfo: HTMLElement = document.createElement("div");
    aboutMikhailInfo.classList.add("about__mikhail-info");
    const mikhailFullName: HTMLElement = document.createElement("h2");
    mikhailFullName.classList.add("about__fullName-Mikhail");
    mikhailFullName.innerText = "Mikhail Kozarev";
    const aboutMikhailProj: HTMLElement = document.createElement("h3");
    aboutMikhailProj.classList.add("about__mikhail-text-proj");
    aboutMikhailProj.innerText =
      "Mikhail is our team lead and public relations specialist. He integrated SDK into the project, created the project in commercetools and API client, integrated the forms with authentication service, handled the authentication token and integration with commercetools. Mikhail customized products filtering and searching, categories and subcategories switching, enabled shopping cart integration and performance optimization. He also managed the displaying of the items in the basket and removing products from it.";

    wrapperMikhail.append(photoMikhail, aboutMikhailInfo);

    const aboutMikhailBio: HTMLElement = document.createElement("h3");
    aboutMikhailBio.classList.add("about__mikhail-text-bio");
    aboutMikhailBio.innerText =
      "Mikhail was born in Mogilev. Thanks to his craving for constant personal growth and expanding the professional sphere of activity, Mikhail has got 3 diplomas of higher education: at the Belarusian-Russian University - of non-destructive testing engineer, at the Belarusian National Technical University - of power engineer, at the Belarusian-Russian University - of civil engineer. His working activity was related to various fields of construction. But Mikhail has always been attracted to the IT field. So he resigned and focused on studying frontend development at RSS school from Stage 0.";

    const githubMikhail: HTMLElement = document.createElement("a");
    githubMikhail.classList.add("about__github-Mikhail");
    const linkMikhail: HTMLLinkElement = document.createElement("link");
    githubMikhail.append(linkMikhail);
    githubMikhail.setAttribute("href", "https://github.com/mishakozarev");
    githubMikhail.setAttribute("target", "_blank");
    githubMikhail.innerText = "Mikhail's GitHub";
    aboutMikhailInfo.append(mikhailFullName, aboutMikhailProj);

    blockMikhail.append(wrapperMikhail, aboutMikhailBio, githubMikhail);
    // MIKHAIL

    // YURIY
    const blockYuriy: HTMLElement = document.createElement("div");
    blockYuriy.classList.add("about__Yuriy");
    const wrapperYuriy: HTMLElement = document.createElement("div");
    wrapperYuriy.classList.add("about__wrapper-Yuriy");
    const aboutYuriyInfo: HTMLElement = document.createElement("div");
    aboutYuriyInfo.classList.add("about__yuriy-info");
    const yuriyFullName: HTMLElement = document.createElement("h2");
    yuriyFullName.classList.add("about__fullName-Yuriy");
    yuriyFullName.innerText = "Yuriy Panteleev";
    const aboutYuriyProj: HTMLElement = document.createElement("h3");
    aboutYuriyProj.classList.add("about__yuriy-text-proj");
    aboutYuriyProj.innerText =
      "Yuriy is the main creator of clean code in our team! He adjusted the repository, developed the environment configuration and scripts, implemented redirection, state management and automatic login, logout functionality, routing for navigation between pages as well as 404 page and managing address details. All the possible actions with the product cards and the detailed cards as well as fetching and displaying the products data and images from the commercetools API were implemented by Yuriy. He also enabled actions with the goods in the basket and its cost. ";

    const photoYuriy: HTMLElement = document.createElement("div");
    photoYuriy.classList.add("about__photo-yuriy");

    wrapperYuriy.append(aboutYuriyInfo, photoYuriy);

    const aboutYuriyBio: HTMLElement = document.createElement("h3");
    aboutYuriyBio.classList.add("about__yuriy-text-bio");
    aboutYuriyBio.innerText =
      "Yuriy was born and grew up in Mogilev. He spent two years in Minsk as a Sales Manager of commercial equipment after graduating from the Belarusian State University of Food and Chemical Technologies. Then he went back to Mogilev and had been working as a Programming engineer of fire alarm for about ten years. Last year Yuriy decided to switch his career. His dedication and academic success from the very beginning of Stage 0 and till now makes him more confident in his choice.";

    const githubYuriy: HTMLElement = document.createElement("a");
    githubYuriy.classList.add("about__github-Yuriy");
    const linkYuriy: HTMLLinkElement = document.createElement("link");
    githubYuriy.append(linkYuriy);
    githubYuriy.setAttribute("href", "https://github.com/Yuriy85");
    githubYuriy.setAttribute("target", "_blank");
    githubYuriy.innerText = "Yuriy's GitHub";
    aboutYuriyInfo.append(yuriyFullName, aboutYuriyProj);

    blockYuriy.append(wrapperYuriy, aboutYuriyBio, githubYuriy);
    // YURIY

    // MARIA
    const blockMaria: HTMLElement = document.createElement("div");
    blockMaria.classList.add("about__Maria");
    const wrapperMaria: HTMLElement = document.createElement("div");
    wrapperMaria.classList.add("about__wrapper-Maria");
    const photoMary: HTMLElement = document.createElement("div");
    photoMary.classList.add("about__photo-maria");
    const aboutMariaInfo: HTMLElement = document.createElement("div");
    aboutMariaInfo.classList.add("about__maria-info");
    const mariaFullName: HTMLElement = document.createElement("h2");
    mariaFullName.classList.add("about__fullName-Maria");
    mariaFullName.innerText = "Maria Panteleeva";
    const aboutMariaProj: HTMLElement = document.createElement("h3");
    aboutMariaProj.classList.add("about__maria-text-proj");
    aboutMariaProj.innerText =
      "Maria was actively involved into our website design, helped to develop environment configuration and scripts, implemented input validation for the login and registration pages as well as error indicating messages, add redirecting buttons and links and handled with centralized navigation. She found and prepared all the products photo, formulated the descriptions of each product and successfully catalogued the products into the commercetools, enabled the product cards with the basket buttons and created this page about our first andy fantastic TEAM!";

    wrapperMaria.append(photoMary, aboutMariaInfo);

    const aboutMariaBio: HTMLElement = document.createElement("h3");
    aboutMariaBio.classList.add("about__maria-text-bio");
    aboutMariaBio.innerText =
      "Maria is from Mogilev too, she graduated from the Belarusian Pedagogical University but has been working as a Foreign Trade Manager for more than 10 years. At the same time Maria got a diploma in innovative management at the Belarusian National Technical University and diploma of an interpreter at the Belarusian-Russian University. But despite the interesting job with business trips, participation in exhibitions and communication with foreigners, it was a desire to move on. The high time to think about changing the occupation and the lifestyle. That was how Maria became a student of the Stage 0 at RS School in December 2022. Amazing time and remarkable experience!";

    const githubMaria: HTMLElement = document.createElement("a");
    githubMaria.classList.add("about__github-Maria");
    const linkMaria: HTMLLinkElement = document.createElement("link");
    githubMaria.append(linkMaria);
    githubMaria.setAttribute("href", "https://github.com/Maryinfun");
    githubMaria.setAttribute("target", "_blank");
    githubMaria.innerText = "Maria's GitHub";
    aboutMariaInfo.append(mariaFullName, aboutMariaProj);

    blockMaria.append(wrapperMaria, aboutMariaBio, githubMaria);
    // MARIA

    mainWrapper.append(
      caption,
      introduction,
      gratitude,
      blockMikhail,
      blockYuriy,
      blockMaria,
    );

    return mainWrapper;
  }
}

export default AboutPage;
