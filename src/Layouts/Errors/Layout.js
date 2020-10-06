import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Body from "./Common/Body";
import { Router } from "react-router-dom";
import History from "Utils/History";

/***
 * handel layout
 * @returns {*}
 * @constructor
 */
const Layout = () => {

  return (
    <div>
      <Router history={History}>
        <Body />
      </Router>
    </div>
  );
};

Layout.defaultProps = {
  name: 'Errors'
}

export default Layout;
