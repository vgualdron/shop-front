import { http } from '../../helpers/http';

export default {
  fetchProducts: () => http({
    url: `${process.env.URL_API}/product`,
    method: 'GET',
  }),
  addProduct: (data) => http({
    url: `${process.env.URL_API}/product`,
    method: 'POST',
    data,
  }),
  updateProduct: (data) => http({
    url: `${process.env.URL_API}/product/${data.id}`,
    method: 'PUT',
    data,
  }),
  deleteProduct: (id) => http({
    url: `${process.env.URL_API}/product/${id}`,
    method: 'DELETE',
  }),
};
