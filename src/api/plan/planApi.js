import { http } from '../../helpers/http';

export default {
  fetchPlans: () => http({
    url: `${process.env.URL_API}/plan`,
    method: 'GET',
  }),
  addPlan: (data) => http({
    url: `${process.env.URL_API}/plan`,
    method: 'POST',
    data,
  }),
  updatePlan: (data) => http({
    url: `${process.env.URL_API}/plan/${data.id}`,
    method: 'PUT',
    data,
  }),
  deletePlan: (id) => http({
    url: `${process.env.URL_API}/plan/${id}`,
    method: 'DELETE',
  }),
};
