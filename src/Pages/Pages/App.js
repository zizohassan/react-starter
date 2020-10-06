import React, { useContext } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { AuthContext } from "Context/Store";
import Date from "Components/TimeDate/Date";
import { useTranslation } from "react-i18next";

const AppPage = () => {
  const [auth] = useContext(AuthContext)
  const [_trans] = useTranslation();

  return (
    <>
      <Jumbotron>
        <h1>{_trans('Welcome')} {auth.user.first_name}{_trans('last login was on')} <Date date={auth.user.updated_at} />
        </h1>
        <p>
          {_trans('This is a simple hero unit, a simple jumbotron-style component for')}
        </p>
        <p>
          <Button variant="primary">{_trans('Learn more')}</Button>
        </p>
      </Jumbotron>
    </>
  )
};

export default AppPage;
