import Route from "route-parser";

export const pagePaths = {
  mainPath: "/",
  catalogPath: "/catalog",
  detailedPath: "/detailed",
  profilePath: "/profile",
  loginPath: "/login",
  registerPath: "/register",
  basketPath: "/basket",
  aboutPath: "/about",
};

export const pageRoutes = {
  main: new Route(pagePaths.mainPath),
  catalog: new Route(pagePaths.catalogPath),
  detailed: new Route(pagePaths.detailedPath),
  profile: new Route(pagePaths.profilePath),
  login: new Route(pagePaths.loginPath),
  register: new Route(pagePaths.registerPath),
  basket: new Route(pagePaths.basketPath),
  about: new Route(pagePaths.aboutPath),
};
