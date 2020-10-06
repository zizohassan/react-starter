/**
 * handel logs
 */
class LogProvider {
  /**
   * log data
   * @param {*} data
   * @param {*} type
   */
  logData(data, type) {
    if (
      process.env.REACT_APP_LOG_REQUEST === "true" &&
      process.env.REACT_APP_ENV === "local"
    ) {
      console.log("************ log " + type + " ************");
      console.log(JSON.parse(JSON.stringify(data)));
    }
  }
}

export default new LogProvider();
