import { http } from '../../helpers/http';

export default {
  fetchCompanies: () => http({
    url: `${process.env.URL_API}/company`,
    method: 'GET',
  }),
  addCompany: (data) => http({
    url: `${process.env.URL_API}/company`,
    method: 'POST',
    data,
  }),
  updateCompany: (data) => http({
    url: `${process.env.URL_API}/company/${data.id}`,
    method: 'PUT',
    data,
  }),
  deleteCompany: (id) => http({
    url: `${process.env.URL_API}/company/${id}`,
    method: 'DELETE',
  }),
  changeLogoCompany: (data) => http({
    url: `${process.env.URL_API}/company/change-logo/${data.id}`,
    method: 'POST',
    data,
  }),
};
