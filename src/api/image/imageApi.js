import { http } from '../../helpers/http';

export default {
  addImage: (data) => http({
    url: `${process.env.URL_API}/image`,
    method: 'POST',
    data,
  }),
  updateImage: (data) => http({
    url: `${process.env.URL_API}/image/${data.id}`,
    method: 'PUT',
    data,
  }),
  deleteImage: (id) => http({
    url: `${process.env.URL_API}/image/${id}`,
    method: 'DELETE',
  }),
};
