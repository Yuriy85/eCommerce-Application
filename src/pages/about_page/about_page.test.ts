import AboutPage from "../about_page/about_page";
import { expect, describe, test } from "@jest/globals";

describe("test: render AboutPage function return HTMLElement", () => {
  const aboutPage: AboutPage = new AboutPage();
  const result: HTMLElement = document.createElement("div");
  result.className = "about";
  result.innerHTML =
    '<h2 class="about__caption"></h2><h3 class="about__introduction"></h3><div class="about__gratitude"><h3 class="about__gratitude-text"><a class="about__logoRS" href="https://rs.school/" target="_blank"><img src="undefined" style="height: 50px; padding-left: 20px; scale: 1.3"></a></h3></div><div class="about__Mikhail"><div class="about__wrapper-Mikhail"><div class="about__photo-mikhail"></div><div class="about__mikhail-info"><h2 class="about__fullName-Mikhail"></h2><h3 class="about__mikhail-text-proj"></h3></div></div><h3 class="about__mikhail-text-bio"></h3><a class="about__github-Mikhail" href="https://github.com/mishakozarev" target="_blank"><link /></a></div><div class="about__Yuriy"><div class="about__wrapper-Yuriy"><div class="about__yuriy-info"><h2 class="about__fullName-Yuriy"></h2><h3 class="about__yuriy-text-proj"></h3></div><div class="about__photo-yuriy"></div></div><h3 class="about__yuriy-text-bio"></h3><a class="about__github-Yuriy" href="https://github.com/Yuriy85" target="_blank"><link /></a></div><div class="about__Maria"><div class="about__wrapper-Maria"><div class="about__photo-maria"></div><div class="about__maria-info"><h2 class="about__fullName-Maria"></h2><h3 class="about__maria-text-proj"></h3></div></div><h3 class="about__maria-text-bio"></h3><a class="about__github-Maria" href="https://github.com/Maryinfun" target="_blank"><link /></a></div>';
  test("Test1", () => {
    expect(result).toStrictEqual(aboutPage.render());
  });
});
