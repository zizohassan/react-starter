import React  from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Common/Header";
import Body from "./Common/Body";
import Footer from "./Common/Footer";
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
        <Header />
        <Body />
      </Router>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  name: 'Default'
}

export default Layout;
