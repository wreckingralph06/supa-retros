import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

const Create = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [formError, setFormError] = useState(null);

  const cancelAction = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    console.log("handlesubmit");
    e.preventDefault();
    if (!name || !description || !price) {
      setFormError("Please fill in all the fields correctly.");
      return;
    }

    const { data, error } = await supabase
      .from("retro_consoles")
      .insert([{ name, description, price }])
      .select("*");

    if (error) {
      console.log("error: ", error);
      setFormError("Please fill in all the fields correctly.");
    }

    if (data) {
      console.log("data: ", data);
      setFormError(null);
      navigate("/");
    }
  };

  return (
    <div className="form-page">
      <form onSubmit={handleSubmit}>
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
        <button>Create Retro Console</button>
        <button className="cancel-button" onClick={cancelAction}>
          Cancel
        </button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Create;
