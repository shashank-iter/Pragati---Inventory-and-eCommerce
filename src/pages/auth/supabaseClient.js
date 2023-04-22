import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPADB_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
