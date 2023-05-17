import types from './types';
import companyApi from '../../../api/company/companyApi';

export default {
  async [types.actions.FETCH_COMPANIES]({ commit }, payload) {
    try {
      const response = await companyApi.fetchCompanies(payload);
      commit(types.mutations.SET_COMPANIES, response.data.data);
    } catch (error) {
      console.error(error);
      commit(types.mutations.SET_COMPANIES, error.response.data);
    }
  },
  async [types.actions.ADD_COMPANY]({ commit }, payload) {
    try {
      const response = await companyApi.addCompany(payload);
      commit(types.mutations.SET_STATUS_ADD_COMPANY, response.data);
    } catch (error) {
      console.error(error);
      commit(types.mutations.SET_STATUS_ADD_COMPANY, error.response.data);
    }
  },
  async [types.actions.UPDATE_COMPANY](context, payload) {
    try {
      await companyApi.updateCompany(payload);
    } catch (error) {
      console.error(error);
    }
  },
  async [types.actions.DELETE_COMPANY](context, id) {
    try {
      await companyApi.deleteCompany(id);
    } catch (error) {
      console.error(error);
    }
  },
  async [types.actions.CHANGE_LOGO]({ commit }, payload) {
    try {
      const response = await companyApi.changeLogoCompany(payload);
      commit(types.mutations.SET_STATUS_CHANGE_LOGO, response.data);
    } catch (error) {
      console.error(error);
      commit(types.mutations.SET_STATUS_CHANGE_LOGO, error.response.data);
    }
  },
};
