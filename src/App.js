import React, { useContext } from "react";
import { LayoutContext } from "./Context/Store";
import './App.scss'
import LayoutProvider from "./Providers/Routes/LayoutProvider";
import LanguagesProvider from "./Providers/Languages/LanguagesProvider";

/**
 * load layout from context
 * @returns {*}
 * @constructor
 */
const App = () => {
  const [Layout ] = useContext(LayoutContext);

  return (
    <div data-layout={LayoutProvider.getLayout()} dir={LanguagesProvider.getLanguageObjectFromStorage().dir} className="back">
      <div className="back">
        <Layout.layout/>
      </div>
    </div>
  );

};

export default App;
