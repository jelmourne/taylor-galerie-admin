import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const useSupabase = () => {
  const [supabase] = useState(() =>
    createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_PK
    )
  );
  return supabase;
};

export default useSupabase;
