import { http } from '../../helpers/http';

export default {
  signin: (data) => http({
    url: `${process.env.URL_API}/login`,
    method: 'POST',
    data,
  }),
};
