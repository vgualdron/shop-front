export default {
  PATH: '@module/company',
  actions: {
    FETCH_COMPANIES: '@actions/fetchCompanies',
    ADD_COMPANY: '@actions/addCompany',
    UPDATE_COMPANY: '@actions/updateCompany',
    DELETE_COMPANY: '@actions/deleteCompany',
    CHANGE_LOGO: '@actions/changeLogo',
  },
  getters: {
  },
  mutations: {
    SET_COMPANIES: '@mutations/setCompanies',
    SET_STATUS_ADD_COMPANY: '@mutations/setStatusAddCompany',
    SET_STATUS_CHANGE_LOGO: '@mutations/setStatusChangeLogo',
  },
};
