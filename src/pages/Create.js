import { useState } from "react";
import supabase from "../config/supabaseClient";

const Create = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    console.log("handlesubmit");
    e.preventDefault();
    if (!name || !description || !price) {
      setFormError("Please fill in all the fields correctly.");
      return;
    }

    console.log("pass1");

    const { data, error } = await supabase
      .from("retro_consoles")
      .insert([{ name, description, price }])
      .select("*");

    console.log("pass2");

    if (error) {
      console.log("error: ", error);
      setFormError("Please fill in all the fields correctly.");
    }
    console.log("pass3");
    console.log("data: ", data);
    if (data) {
      console.log("data: ", data);
      setFormError(null);
    }
  };

  return (
    <div className="create-page">
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
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Create;
