import types from './types';

export default {
  [types.mutations.SET_STATUS_SIGN_IN](state, payload) {
    state.statusSignIn = payload;
  },
};
