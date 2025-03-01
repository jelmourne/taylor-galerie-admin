import { createRoot } from "react-dom/client";
import useSupabase from "./hooks/useSupabase";
import { useState, useEffect } from "react";

import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

function App() {
  const supabase = useSupabase();

  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <Auth supabase={supabase} />;
  } else {
    return <Dashboard />;
  }
}

createRoot(document.getElementById("root")).render(<App />);
