import { http } from '../../helpers/http';

export default {
  fetchUsers: () => http({
    url: `${process.env.URL_API}/user`,
    method: 'GET',
  }),
  addUser: (data) => http({
    url: `${process.env.URL_API}/user`,
    method: 'POST',
    data,
  }),
  updateUser: (data) => http({
    url: `${process.env.URL_API}/user/${data.id}`,
    method: 'PUT',
    data,
  }),
  changePassword: (data) => http({
    url: `${process.env.URL_API}/user/change-password/session`,
    method: 'PUT',
    data,
  }),
  deleteUser: (idUser) => http({
    url: `${process.env.URL_API}/user/${idUser}`,
    method: 'DELETE',
  }),
};
