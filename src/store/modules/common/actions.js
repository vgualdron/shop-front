import types from './types';
import authApi from '../../../api/auth/authApi';

export default {
  async [types.actions.SIGN_IN]({ commit }, payload) {
    try {
      const response = await authApi.signin(payload);
      commit(types.mutations.SET_STATUS_SIGN_IN, response.data);
      localStorage.setItem('token', JSON.stringify(response.data.token));
      localStorage.setItem('user', JSON.stringify(response.data.message));
    } catch (error) {
      console.error(error);
      commit(types.mutations.SET_STATUS_SIGN_IN, error.response.data);
    }
  },
};
