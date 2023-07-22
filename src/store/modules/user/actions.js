import types from './types';
import userApi from '../../../api/user/userApi';

export default {
  async [types.actions.FETCH_USERS]({ commit }, payload) {
    try {
      const response = await userApi.fetchUsers(payload);
      commit(types.mutations.SET_USERS, response.data.data);
    } catch (error) {
      console.error(error);
      commit(types.mutations.SET_USERS, error.response.data);
    }
  },
  async [types.actions.ADD_USER]({ commit }, payload) {
    try {
      const response = await userApi.addUser(payload);
      commit(types.mutations.SET_STATUS_ADD_USER, response.data);
    } catch (error) {
      console.error(error);
      commit(types.mutations.SET_STATUS_ADD_USER, error.response.data);
    }
  },
  async [types.actions.UPDATE_USER](context, payload) {
    try {
      await userApi.updateUser(payload);
    } catch (error) {
      console.error(error);
    }
  },
  async [types.actions.CHANGE_PASSWORD_USER](context, payload) {
    try {
      await userApi.changePassword(payload);
    } catch (error) {
      console.error(error);
    }
  },
  async [types.actions.DELETE_USER](context, idUser) {
    try {
      await userApi.deleteUser(idUser);
    } catch (error) {
      console.error(error);
    }
  },
  async [types.actions.CHANGE_IMAGE_PROFILE]({ commit }, payload) {
    try {
      const response = await userApi.changeImageProfile(payload);
      commit(types.mutations.SET_STATUS_CHANGE_IMAGE_PROFILE, response.data);
    } catch (error) {
      console.error(error);
      commit(types.mutations.SET_STATUS_CHANGE_IMAGE_PROFILE, error.response.data);
    }
  },
};
