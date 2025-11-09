// This file is deprecated - the client now uses the API instead of Supabase directly
// Keeping this for backward compatibility, but it's no longer needed

// If you need to use Supabase in the future, uncomment the code below:
/*
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
*/

// Dummy export for backward compatibility
export const supabase = null;
