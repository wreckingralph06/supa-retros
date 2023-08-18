import supabase from "../config/supabaseClient";
import { useState, useEffect } from "react";

import RetroConsoleCard from "../components/RetroConsoleCard";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [retroConsoles, setRetroConsoles] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");

  const handleDelete = (id) => {
    setRetroConsoles((previousRetroConsoles) => {
      return previousRetroConsoles.filter((rc) => rc.id !== id);
    });
  };

  useEffect(() => {
    const fetchRetroConsoles = async () => {
      const { data, error } = await supabase
        .from("retro_consoles")
        .select()
        .order(orderBy, { ascending: false });

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
  }, [orderBy]);

  return (
    <div className="home-page">
      {fetchError && <p>{fetchError}</p>}
      {retroConsoles && (
        <div className="retro-consoles">
          <div className="order-by">
            <p>Order by: </p>
            <button onClick={() => setOrderBy("created_at")}>
              Time Created
            </button>
            <button onClick={() => setOrderBy("name")}>Name</button>
            <button onClick={() => setOrderBy("price")}>Price</button>
            {orderBy}
          </div>
          <div className="retro-console-grid">
            {retroConsoles.map((retroConsole) => (
              <RetroConsoleCard
                key={retroConsole.id}
                retroConsole={retroConsole}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
