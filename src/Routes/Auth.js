import AppPage from "Pages/Pages/App";

//PLOP_IMPORT_INJECT

/**
 * only auth user can access these routes
 * define your route list route provider will handel it
 * dynamic and load your components
 * you can change the default layout by parse layout in object
 * @type {{path: string, component: AppPage, label: string}[]}
 */
export const AuthRouteList = {
  //PLOP_ROUTE_INJECT
  app: { path: "/app", component: AppPage, label: "App" }
};



















































