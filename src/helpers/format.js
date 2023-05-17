export const formatCurrency = (number) => {
  const options = { style: 'currency', currency: 'COP', maximumSignificantDigits: 12 };
  const numberFormat = new Intl.NumberFormat('es-CO', options);
  return numberFormat.format(number);
};

export default {};
