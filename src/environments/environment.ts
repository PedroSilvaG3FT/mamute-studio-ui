import { FIREBASE_CONFIG } from '../app/modules/@core/firebase/firebase.config';
import { STRIPE_CONFIG } from '../app/modules/@core/stripe/stripe.config';
import { SUPABASE_CONFIG } from '../app/modules/@core/supabase/supabase.config';

export const environment = {
  production: true,
  stripe: STRIPE_CONFIG,
  firebase: FIREBASE_CONFIG,
  supabase: SUPABASE_CONFIG,
};
