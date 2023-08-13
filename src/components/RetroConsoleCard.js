const RetroConsoleCard = ({ retroConsole }) => {
  return (
    <div className="retro-console-card">
      <h3>{retroConsole.name}</h3>
      <p>{retroConsole.description}</p>
      <div className="price">{retroConsole.price}</div>
    </div>
  );
};

export default RetroConsoleCard;
