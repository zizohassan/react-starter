import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";

const ContactPage = () => {
  const [_trans] = useTranslation();

  return (
    <Jumbotron>
      <h1>{_trans('Contact')}</h1>
      <p>
        {_trans('This is a simple hero unit, a simple jumbotron-style component for')}
      </p>
      <p>
        <Button variant="primary">{_trans('Learn more')}</Button>
      </p>
    </Jumbotron>
  );
};

export default ContactPage;
