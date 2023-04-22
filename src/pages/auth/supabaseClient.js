import { createClient } from "@supabase/supabase-js";

// Importing the supabase URL and key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPADB_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// Creating a supabase client with the URL and key
const supabase = createClient(supabaseUrl, supabaseKey);

// Exporting the supabase client as default
export default supabase;
