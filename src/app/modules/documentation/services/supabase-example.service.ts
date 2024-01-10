import { Injectable } from '@angular/core';
import { SupabaseClientBase } from '../../@core/supabase/supabase-client.base';

@Injectable({ providedIn: 'root' })
export class SupabaseExampleService extends SupabaseClientBase {
  constructor() {
    super('TableExample');
  }
}
