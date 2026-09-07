const colors = {
  정상: "#30ec78",
  휴면: "#d9d9d9",
  지급정지: "#d93025",
  해지: "#1f1f1f",
};

// inline - style = {{key:value}} 형태로
function StatusBadge({ status }) {
  return (
    <span className="badge" style={{ backgroundColor: colors[status] }}>
      {status}
    </span>
  );
}

export default StatusBadge;
