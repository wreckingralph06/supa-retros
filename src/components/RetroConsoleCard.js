import { Link } from "react-router-dom";
import supabase from "../config/supabaseClient";
import logo192 from "../assets/gameboy.jpg";

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
