import { Injectable } from '@angular/core';
import { SupabaseTableBase } from '../../@core/supabase/supabase-table.base';

@Injectable({ providedIn: 'root' })
export class SupabaseExampleService extends SupabaseTableBase {
  constructor() {
    super('TableExample');
  }
}
