import common, { name as commonName } from './common';
import user, { name as userName } from './user';
import configuration, { name as configurationName } from './configuration';
import category, { name as categoryName } from './category';
import plan, { name as planName } from './plan';
import company, { name as companyName } from './company';

export default {
  [commonName]: common,
  [userName]: user,
  [configurationName]: configuration,
  [categoryName]: category,
  [planName]: plan,
  [companyName]: company,
};
