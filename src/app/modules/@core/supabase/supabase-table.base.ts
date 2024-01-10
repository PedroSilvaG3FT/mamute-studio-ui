import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment';

export class SupabaseTableBase {
  public supabase: SupabaseClient;

  constructor(public tableName: string) {
    this.supabase = createClient(
      environment.supabase.url,
      environment.supabase.key
    );
  }

  public async getByColumn<Data>(column: string, value: any) {
    try {
      const response = await this.supabase
        .from(this.tableName)
        .select()
        .eq(column, value)
        .single();

      return { ...response, data: response.data as Data };
    } catch (error) {
      throw error;
    }
  }

  public async getAll<Data>(columns: string = '*') {
    try {
      const response = await this.supabase.from(this.tableName).select(columns);
      return { ...response, data: response.data as Data };
    } catch (error) {
      throw error;
    }
  }

  public getById<Data>(id: number) {
    return this.getByColumn<Data>('id', id);
  }

  public async create<Data>(data: Data) {
    try {
      const response = await this.supabase
        .from(this.tableName)
        .insert(data)
        .select()
        .single();
      return { ...response, data: response.data as Data };
    } catch (error) {
      throw error;
    }
  }

  public async update<Data>(data: Partial<Data>, id: number) {
    try {
      const response = await this.supabase
        .from(this.tableName)
        .update(data)
        .eq('id', id)
        .select()
        .single();
      return { ...response, data: response.data as Data };
    } catch (error) {
      throw error;
    }
  }

  public async delete(id: number) {
    try {
      const response = await this.supabase
        .from(this.tableName)
        .delete()
        .eq('id', id);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
