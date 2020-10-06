import React, { useContext } from "react";
import Moment from "react-moment";
import { LanguageContext } from "Context/Store";
//PLOP_IMPORT_INJECT
import 'moment/locale/en-au';
import 'moment/locale/ar';
import { DateTimeConfig } from "Config/DateTimeConfig";

/***
 * handel time language and format
 * @param props
 * @param rest
 * @returns {*}
 * @constructor
 */
const Date = (props , rest) => {
  const [language] = useContext(LanguageContext)

  return <Moment  calendar locale={DateTimeConfig.momentLang[language.lang]  ? DateTimeConfig.momentLang[language.lang] : language.lang} date={props.date} {...rest} />

};

export default Date;







