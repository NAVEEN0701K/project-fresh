// Format price in Indian Rupees
export const formatPrice = (price) => {
  if (price == null || isNaN(price)) return 'Rs. 0';
  return 'Rs. ' + Math.round(price).toLocaleString('en-IN');
};

export const getDiscountPercent = (original, current) => {
  if (!original || original <= current) return 0;
  return Math.round(((original - current) / original) * 100);
};
