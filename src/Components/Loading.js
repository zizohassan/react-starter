import React from "react";
import { useTranslation } from "react-i18next";

/***
 * handel application loading status
 * @returns {*}
 * @constructor
 */
const Loading = (props) => {
  const [_trans] = useTranslation();

  return props.loading ? (
    <div className="text-center loading">
      <span>{_trans("Loading")} ...</span>
    </div>
  ) : (
    ""
  );
};

export default Loading;
