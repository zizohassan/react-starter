/***
 * handel layout on global
 */
import LocalStoragesProviders from "Providers/LocalStoages/LocalStoragesProviders";
import { LayoutConfig } from "Config/LayoutConfig";

/***
 * handel layout option
 */
class LayoutProvider extends LocalStoragesProviders{

  /***
   * get layout name form storage
   */
  getLayout(){
    return this.get('layoutName')
  }

  /**
   * set default layout name in storage
   */
  setDefaultLayout(){
    this.set('layoutName' , LayoutConfig.defaultLayoutFolderName)
  }

  /**
   * set specific layout name
   * @param name
   */
  setLayoutName(name){
    this.set('layoutName' , name)
  }

}

export default new LayoutProvider();