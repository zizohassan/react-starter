import IndexPage from "Pages/Pages/Index";
import AboutPage from "Pages/Pages/About";
import ContactPage from "Pages/Pages/Contact";
import SignIn from "Pages/Auth/SignIn";
import SignUp from "Pages/Auth/SignUp";
import Error404 from "Pages/Errors/Error404";
import Layout from "Layouts/Errors/Layout";
import Error401 from "Pages/Errors/Error401";
//PLOP_IMPORT_INJECT

/**
 * this routes will access by auth users and guest use
 * define your route list route provider will handel it
 * dynamic and load your components
 * @type {*[]}
 */
export const GuestRouteList = {
  home: { path: "/", component: IndexPage, label: "Home" },
  about: { path: "/about", component: AboutPage, label: "About" },
  contact: { path: "/contact", component: ContactPage, label: "Contact" },
  //PLOP_ROUTE_INJECT

  // errors page
  error401: { path: "/404", component: Error404, label: "404 page", layout: Layout, show: false },
  error404: { path: "/401", component: Error401, label: "401 page", layout: Layout, show: false }
};

/**
 * this routes allow for Guest only Auth user can not access this routes
 * it will load automatic you can play in design on header component
 * @type {*[]}
 */
export const GuestOnlyRouteList = {
  signIn: { path: "/sign-in", component: SignIn, label: "Sign In", name: "sign-in" },
  signUp: { path: "/sign-up", component: SignUp, label: "Sign Up", name: "sign-up" }
};













































