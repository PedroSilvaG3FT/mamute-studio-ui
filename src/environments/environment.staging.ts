import { FIREBASE_CONFIG } from '../app/modules/@core/firebase/firebase.config';
import { SUPABASE_CONFIG } from '../app/modules/@core/supabase/supabase.config';

export const environment = {
  production: false,
  firebase: FIREBASE_CONFIG,
  supabase: SUPABASE_CONFIG,
};
