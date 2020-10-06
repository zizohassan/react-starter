import React from "react";
import { useTranslation } from "react-i18next";

const Error404 = () => {
  const [_trans] = useTranslation();

  return (
    <div className="wrapper mt-lg-5">
      <div className="container-fluid" id="top-container-fluid-nav">
        <div className="container">
        </div>
      </div>
      <div className="container-fluid" id="body-container-fluid">
        <div className="container">
          <div className="jumbotron">
            <h1 className="display-1">{_trans('404')}</h1>
            <h1 className="display-3">{_trans('ERROR')}</h1>
            <p className="lower-case">{_trans('Aw !! webpage not found please try to refresh')}</p>
            <p className="lower-case">{_trans('Maybe the page is under maintenance')}</p>
          </div>
        </div>
      </div>
      <div className="container-fluid" id="footer-container-fluid">
        <div className="container">
        </div>
      </div>
    </div>
  );
};

export default Error404;
