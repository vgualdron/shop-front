import { http } from '../../helpers/http';

export default {
  fetchConfigurations: () => http({
    url: `${process.env.URL_API}/configuration`,
    method: 'GET',
  }),
  addConfiguration: (data) => http({
    url: `${process.env.URL_API}/configuration`,
    method: 'POST',
    data,
  }),
  updateConfiguration: (data) => http({
    url: `${process.env.URL_API}/configuration/${data.id}`,
    method: 'PUT',
    data,
  }),
  deleteConfiguration: (id) => http({
    url: `${process.env.URL_API}/configuration/${id}`,
    method: 'DELETE',
  }),
};
