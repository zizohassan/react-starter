import { ResponseConfig } from "Config/ResponseConfig";

/***
 * response handel
 */
class ResponseProvider {

  /***
   * return with normal response
   * @returns {{data: {}, message: string, status: boolean}}
   */
  getNormalResponse(){
    return ResponseConfig.Normal;
  }

  /***
   * return with pagin response
   * @returns {{data: {first_page_url: string, path: string, per_page: number, total: number, data: [], last_page: number, last_page_url: string, next_page_url: null, from: number, to: number, prev_page_url: null, current_page: number}, message: string, status: boolean}}
   */
  getPagingResponse(){
    return ResponseConfig.Paing;
  }

}

export default new ResponseProvider();
