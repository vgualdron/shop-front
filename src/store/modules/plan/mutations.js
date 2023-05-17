import types from './types';

export default {
  [types.mutations.SET_PLANS](state, payload) {
    state.plans = payload;
  },
  [types.mutations.SET_STATUS_ADD_PLAN](state, payload) {
    state.statusAddPlan = payload;
  },
};
