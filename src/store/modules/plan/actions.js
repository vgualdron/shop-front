import types from './types';
import planApi from '../../../api/plan/planApi';

export default {
  async [types.actions.FETCH_PLANS]({ commit }, payload) {
    try {
      const response = await planApi.fetchPlans(payload);
      commit(types.mutations.SET_PLANS, response.data.data);
    } catch (error) {
      console.error(error);
      commit(types.mutations.SET_PLANS, error.response.data);
    }
  },
  async [types.actions.ADD_PLAN]({ commit }, payload) {
    try {
      const response = await planApi.addPlan(payload);
      commit(types.mutations.SET_STATUS_ADD_PLAN, response.data);
    } catch (error) {
      console.error(error);
      commit(types.mutations.SET_STATUS_ADD_PLAN, error.response.data);
    }
  },
  async [types.actions.UPDATE_PLAN](context, payload) {
    try {
      await planApi.updatePlan(payload);
    } catch (error) {
      console.error(error);
    }
  },
  async [types.actions.DELETE_PLAN](context, id) {
    try {
      await planApi.deletePlan(id);
    } catch (error) {
      console.error(error);
    }
  },
};
