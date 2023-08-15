import { Link } from "react-router-dom";

const RetroConsoleCard = ({ retroConsole }) => {
  return (
    <div className="retro-console-card">
      <h3>{retroConsole.name}</h3>
      <p>{retroConsole.description}</p>
      <div className="price">{retroConsole.price}</div>
      <div className="buttons">
        <Link to={"/" + retroConsole.id}>
          <i className="material-icons">Edit</i>
        </Link>
      </div>
    </div>
  );
};

export default RetroConsoleCard;
