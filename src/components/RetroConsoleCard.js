import { Link } from "react-router-dom";
import supabase from "../config/supabaseClient";

const RetroConsoleCard = ({ retroConsole, onDelete }) => {
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("retro_consoles")
      .delete()
      .eq("id", retroConsole.id)
      .select();

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log(data);
      onDelete(retroConsole.id);
    }
  };

  return (
    <div className="retro-console-card">
      <h3>{retroConsole.name}</h3>
      <p>{retroConsole.description}</p>
      <div className="price">{retroConsole.price}</div>
      <div className="buttons">
        <Link to={"/" + retroConsole.id}>
          <i className="material-icons">Edit</i>
        </Link>
        <i className="material-icons" onClick={handleDelete}>
          delete
        </i>
      </div>
    </div>
  );
};

export default RetroConsoleCard;
