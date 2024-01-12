export interface IDocAuthenticationCredentials {
  email: string;
  password: string;
}

export interface IDocAuthenticationSignUp {
  id?: string | number; // firebase | supabase item identifier
  uid?: string; // firebase auth user uuid
  age: number;
  name: string;
  email: string;
  password: string;
  stripeCustomerId: string;
}
