import React, { useContext } from "react";
import RouterLinkProvider from "Providers/Routes/RouterLinkProvider";
import NavDropdown from "react-bootstrap/NavDropdown";
import { AuthConfig } from "Config/AuthConfig";
import AuthProvider from "Providers/Auth/AuthProvider";
import { AuthContext } from "Context/Store";
import History from "Utils/History";
import Language from "Components/Language";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Route } from "Utils/Route";

/**
 * header section
 * @returns {*}
 * @constructor
 */
const Header = () => {
  /// user from context
  const [auth, setAuth] = useContext(AuthContext);
  /// translation
  const [_trans]  = useTranslation()

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" id="nav">
      <Link to={Route('home')} className="navbar-brand" >Navbar</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <RouterLinkProvider />
          {auth.isAuth && (
            <NavDropdown title={auth.user.first_name} id="basic-nav-dropdown">
              <span className="dropdown-item" href="" onClick={(e) => {
                e.preventDefault();
                AuthProvider.clearStorage();
                setAuth({ user: {}, isAuth: false, token: "" });
                History.push(AuthConfig.redirectAfterLogOut);
              }}>Logout</span>
            </NavDropdown>
          )}
          <NavDropdown title={_trans('Languages')} id="basic-nav-dropdown">
            <Language />
          </NavDropdown>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder={_trans('Search')} aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">{_trans('Search')}</button>
        </form>
      </div>
    </nav>
  );
};

export default Header;
