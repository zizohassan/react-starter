import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const [_trans]  = useTranslation()
  return (
    <footer className="text-muted">
      <div className="container">
        <p className="float-right">
          <a href="#nav">{_trans('Back to top')}</a>
        </p>
        <p>{_trans('Album example is © Bootstrap, but please download and customize it for yourself!')}</p>
        <p>{_trans('New to Bootstrap? Visit the homepage or read our getting started guide.')}</p>
      </div>
    </footer>
  )
};

export default Footer;
