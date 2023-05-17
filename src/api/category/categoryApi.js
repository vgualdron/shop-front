import { http } from '../../helpers/http';

export default {
  fetchCategories: () => http({
    url: `${process.env.URL_API}/category`,
    method: 'GET',
  }),
  addCategory: (data) => http({
    url: `${process.env.URL_API}/category`,
    method: 'POST',
    data,
  }),
  updateCategory: (data) => http({
    url: `${process.env.URL_API}/category/${data.id}`,
    method: 'PUT',
    data,
  }),
  deleteCategory: (id) => http({
    url: `${process.env.URL_API}/category/${id}`,
    method: 'DELETE',
  }),
};
