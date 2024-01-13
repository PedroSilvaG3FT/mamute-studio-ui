import { FIREBASE_CONFIG_STAGING } from '../app/modules/@core/firebase/firebase.config';
import { STRIPE_CONFIG_STAGING } from '../app/modules/@core/stripe/stripe.config';
import { SUPABASE_CONFIG_STAGING } from '../app/modules/@core/supabase/supabase.config';

export const environment = {
  production: false,
  stripe: STRIPE_CONFIG_STAGING,
  firebase: FIREBASE_CONFIG_STAGING,
  supabase: SUPABASE_CONFIG_STAGING,
};
