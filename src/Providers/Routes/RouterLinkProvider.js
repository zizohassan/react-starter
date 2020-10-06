import React, { useContext } from "react";
import { AuthRouteList } from "Routes/Auth";
import { GuestRouteList, GuestOnlyRouteList } from "Routes/Guest";
import { AuthContext } from "Context/Store";
import Menu from "Components/Menu";

/**
 * this file will get list of routes form routes folder
 * then loop on it to generate links
 * this for make routes more easy and dynamic
 * just add your route in route list file then this component will handel it
 */
const RouterLinkProvider = () => {
  const [auth] = useContext(AuthContext);

  return (
    <>
      {auth.isAuth && Object.keys(AuthRouteList).map(key => <Menu singleRoute={AuthRouteList[key]} key={'auth_'+key}/>)}
      {!auth.isAuth && Object.keys(GuestOnlyRouteList).map(key => <Menu singleRoute={GuestOnlyRouteList[key]} key={'only_guest_'+key}/>)}
      {Object.keys(GuestRouteList).map(key => <Menu singleRoute={GuestRouteList[key]} key={'guest_'+key}/>)}
    </>
  );
};

export default RouterLinkProvider;
