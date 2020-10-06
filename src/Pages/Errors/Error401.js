import React from "react";
import { useTranslation } from "react-i18next";

const Error401 = () => {
  const [_trans] = useTranslation();

  return (
    <div className="wrapper mt-lg-5">
      <div class="container-fluid" id="top-container-fluid-nav">
        <div class="container">
        </div>
      </div>
      <div class="container-fluid" id="body-container-fluid">
        <div class="container">
          <div class="jumbotron">
            <h1 class="display-1">{_trans('401')}</h1>
            <h1 class="display-3">{_trans('ERROR')}</h1>
            <p className="lower-case">{_trans('Aw !! webpage not found please try to refresh')}</p>
            <p class="lower-case">{_trans('Maybe the page is under maintenance')}</p>
          </div>
        </div>
      </div>
      <div class="container-fluid" id="footer-container-fluid">
        <div class="container">
        </div>
      </div>
    </div>
  );
};

export default Error401;
