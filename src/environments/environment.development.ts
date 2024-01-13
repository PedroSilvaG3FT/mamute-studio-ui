import { FIREBASE_CONFIG_DEVELOPMENT } from '../app/modules/@core/firebase/firebase.config';
import { STRIPE_CONFIG_DEVELOPMENT } from '../app/modules/@core/stripe/stripe.config';
import { SUPABASE_CONFIG_DEVELOPMENT } from '../app/modules/@core/supabase/supabase.config';

export const environment = {
  production: false,
  stripe: STRIPE_CONFIG_DEVELOPMENT,
  firebase: FIREBASE_CONFIG_DEVELOPMENT,
  supabase: SUPABASE_CONFIG_DEVELOPMENT,
};
