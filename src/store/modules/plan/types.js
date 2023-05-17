export default {
  PATH: '@module/plan',
  actions: {
    FETCH_PLANS: '@actions/fetchPlans',
    ADD_PLAN: '@actions/addPlan',
    UPDATE_PLAN: '@actions/updatePlan',
    DELETE_PLAN: '@actions/deletePlan',
  },
  getters: {
  },
  mutations: {
    SET_PLANS: '@mutations/setPlans',
    SET_STATUS_ADD_PLAN: '@mutations/setStatusAddPlan',
  },
};
