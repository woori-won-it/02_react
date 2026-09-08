// components/AccountCard.jsx
import StatusBadge from "./StatusBadge";
import { formatWon, maskAccountNo, formatWonMasked } from "../utils/format";

function AccountCard({
  accountNo,
  accountType,
  balance,
  status,
  showFullNo,
  showBalance,
  onDeposit,
}) {
  return (
    <div className="card">
      <div className="row">
        <span className="muted">{accountType}</span>
        <StatusBadge status={status} />
      </div>
      <p className="muted">
        {showFullNo ? accountNo : maskAccountNo(accountNo)}
      </p>
      <strong className="balance">
        {formatWonMasked(balance, showBalance)}
      </strong>
      <br />
      <button className="btn" onClick={onDeposit} disabled={status !== "정상"}>
        1만원 입금
      </button>
    </div>
  );
}

export default AccountCard;
