import supabase from "../config/supabaseClient";
import { useState, useEffect } from "react";

import RetroConsoleCard from "../components/RetroConsoleCard";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [retroConsoles, setRetroConsoles] = useState(null);

  useEffect(() => {
    const fetchRetroConsoles = async () => {
      const { data, error } = await supabase.from("retro_consoles").select();

      if (error) {
        setFetchError("Could not fetch retro consoles list");
        setRetroConsoles(null);
      }
      if (data) {
        setRetroConsoles(data);
        setFetchError(null);
      }
    };

    fetchRetroConsoles();
  }, []);

  return (
    <div className="home-page">
      {fetchError && <p>{fetchError}</p>}
      {retroConsoles && (
        <div className="retro-consoles">
          <div className="retro-console-grid">
            {retroConsoles.map((retroConsole) => (
              <RetroConsoleCard
                key={retroConsole.id}
                retroConsole={retroConsole}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
