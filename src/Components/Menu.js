import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

/***
 * Link Component check if allow to show links or not
 * @param props
 * @returns {*}
 * @constructor
 */
const Menu = (props) => {
  const [_trans] = useTranslation();

  return props.singleRoute.show !== false ? <li><Link
    to={props.singleRoute.path}
    className="nav-link"
  >
    {_trans(props.singleRoute.label)}
  </Link> </li>: "";
};


export default Menu;