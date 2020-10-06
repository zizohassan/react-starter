/**
 * config file for errors
 */
export const ResponseConfig = {
  Normal: {
    message: "",
    status: true,
    data: {}
  },
  MapNormal: {
    message: "",
    status: true,
    data: []
  },
  Paing: {
    message: "",
    status: true,
    data: {
      current_page: 1,
      data: [],
      first_page_url: "",
      from: 0,
      last_page: 0,
      last_page_url: "",
      next_page_url: null,
      path: "",
      per_page: 0,
      prev_page_url: null,
      to: 0,
      total: 0
    }
  }
};
