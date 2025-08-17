import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://nfxryxdpolhaerrhchvk.supabase.co",
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export default supabase;