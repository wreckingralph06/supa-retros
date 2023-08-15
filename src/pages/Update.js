import supabase from "../config/supabaseClient";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const fetchRetroConsole = async () => {
      const { data, error } = await supabase
        .from("retro_consoles")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        navigate("/", { replace: true });
      }

      if (data) {
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        console.log("data: ", data);
      }
    };

    fetchRetroConsole();
  }, [id, navigate]);

  return (
    <div className="update-page">
      <form>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="description">Description: </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button>Update Retro Console</button>
        {/* {formError && <p className="error">{formError}</p>} */}
      </form>
    </div>
  );
};

export default Update;
