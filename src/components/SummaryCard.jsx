const SummaryCard = ({ title, amount }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <h2>{amount}</h2>
    </div>
  );
};

export default SummaryCard;
