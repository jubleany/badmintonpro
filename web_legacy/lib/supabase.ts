/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || 'https://zudyyddrfttxehdyhcic.supabase.co';
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_8oZMpwzVl7oQ7v5Td2R7yQ_vOLM7zzx';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
