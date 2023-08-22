import { Link } from "react-router-dom";
import supabase from "../config/supabaseClient";
import logo192 from "../assets/gameboy.jpg";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
      <img className="card-image" src={logo192} alt="logo192"></img>
      <h3 className="console-name">{retroConsole.name}</h3>
      <p className="console-description">{retroConsole.description}</p>
      <div className="price">{retroConsole.price}</div>
      <div className="buttons">
        <Link to={"/" + retroConsole.id}>
          <button className="edit-icon">
            <EditIcon />
          </button>
        </Link>
        <button className="delete-icon" onClick={handleDelete}>
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default RetroConsoleCard;
