import common, { name as commonName } from './common';
import user, { name as userName } from './user';
import configuration, { name as configurationName } from './configuration';
import category, { name as categoryName } from './category';
import product, { name as productName } from './product';
import image, { name as imageName } from './image';

export default {
  [commonName]: common,
  [userName]: user,
  [configurationName]: configuration,
  [categoryName]: category,
  [productName]: product,
  [imageName]: image,
};
