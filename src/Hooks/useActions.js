import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthProvider from "Providers/Auth/AuthProvider";
import { AuthConfig } from "Config/AuthConfig";
import LanguagesProvider from "Providers/Languages/LanguagesProvider";
import { ApiInputErrorContext } from "Context/Store";

export default function UseActions(option) {
  /// loading
  const [loading, setLoading] = useState(false);
  /// data from response
  const [data, setData] = useState([]);
  /// errors
  const [error, setError] = useState({});
  /// response
  const [response, setResponse] = useState({});
  /// set input error in context
  const [,setInputError] = useContext(ApiInputErrorContext);

  useEffect(() => {
    if (option.url && option !== "") {
      option = prependOptions(option);
      switch (option.method) {
        case "get":
          get(option);
          return;
        case "post":
          post(option);
          return;
        default :
          get(option);
          return;
      }
    }
  }, [setData, setError, setLoading, setResponse]);

  function get(option) {
    option["method"] = "get";
    option = prependOptions(option);
    create(option);
  };

  function post(option) {
    option["method"] = "post";
    option = prependOptions(option);
    create(option);
  };

  function put(option) {
    option["method"] = "put";
    option = prependOptions(option);
    create(option);
  };

  function del(option) {
    option["method"] = "delete";
    option = prependOptions(option);
    create(option);
  };

  function prependOptions(option) {
    if (option.url && option.url !== "") {
      /// set method if not exists
      if (!option.method) {
        option["method"] = "get";
      }
      /// set base url if not exists
      if (!option.base_url) {
        option["baseURL"] = process.env.REACT_APP_API_URL;
      }
      option.headers = {};
      /// add token to request
      let user = AuthProvider.getCurrentToken();
      if (user) {
        let userBearerToken = AuthConfig.userBearerToken ? "Bearer " : "";
        option.headers["Authorization"] = userBearerToken + user;
      }
      /// add Accept-language header
      let language = LanguagesProvider.getLanguage();
      if (language) {
        option.headers["Accept-language"] = language;
      }
    }
    return option;
  }

  const create = (option) => {
    setLoading(true);
    axios(option)
      .then((response) => {
        setResponse(response.data);
        if (response.data.data.data) {
          setData(response.data.data.data);
        } else {
          setData(response.data.data);
        }
        setLoading(false);
      })
      .catch((response) => {
        if(response.response.data.message && response.response.data.message === ""){
          response.response.data.message = "Response Status : " + response.response.status + " and server not have message error (call website support) "
        }
        if(response.response.status === 400){
          setInputError(response.response.data.data)
        }
        setResponse(response.response.data);
        setError(response.response.data);
        setLoading(false);
      });
  };

  return {
    data,
    loading,
    error,
    response,
    get,
    post,
    put,
    del
  };

};