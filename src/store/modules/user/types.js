export default {
  PATH: '@module/user',
  actions: {
    FETCH_USERS: '@actions/fetchUsers',
    ADD_USER: '@actions/addUser',
    UPDATE_USER: '@actions/updateUser',
    CHANGE_PASSWORD_USER: '@actions/changePasswordUser',
    DELETE_USER: '@actions/deleteUser',
    CHANGE_IMAGE_PROFILE: '@actions/changeImageProfile',
  },
  getters: {
  },
  mutations: {
    SET_USERS: '@mutations/setUsers',
    SET_STATUS_ADD_USER: '@mutations/setStatusAddUser',
    SET_STATUS_CHANGE_PASSWORD_USER: '@mutations/setStatusChangePasswordUser',
    SET_STATUS_CHANGE_IMAGE_PROFILE: '@mutations/setStatusChangeImageProfile',
  },
};
