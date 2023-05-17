import types from './types';

export default {
  [types.mutations.SET_COMPANIES](state, payload) {
    state.companies = payload;
  },
  [types.mutations.SET_STATUS_ADD_COMPANY](state, payload) {
    state.statusAddCompany = payload;
  },
  [types.mutations.SET_STATUS_CHANGE_LOGO](state, payload) {
    state.statusChangeLogo = payload;
  },
};
