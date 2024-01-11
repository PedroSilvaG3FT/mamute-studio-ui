import { environment } from '../../../../../environments/environment';
const { product_month, product_semester, product_year } = environment.stripe;

export const STRIPE_PRODUCTS = {
  YEAR: { price: product_year, quantity: 1 },
  MONTH: { price: product_month, quantity: 1 },
  SEMESTER: { price: product_semester, quantity: 1 },
};
