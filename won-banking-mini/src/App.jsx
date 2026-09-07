import { useState } from "react";
import "./App.css";
import Clock from "./components/Clock.jsx";
import Counter from "./components/Counter.jsx";
import AccountCard from "./components/AccountCard.jsx";
import Panel from "./components/Panel.jsx";
import Header from "./components/Header.jsx";
import { transactions } from "./data/mockData.js";
import TransactionRow from "./components/TransactionRow.jsx";

function App() {
  // 화면이 렌더링 되기 위해 필요로 하는 값(data)을 적습니다.
  const accounts = [
    {
      accountId: 1,
      accountNo: "1002-345-678901",
      accountType: "입출금",
      balance: 1523000,
      status: "정상",
      ownerName: "김연지",
    },
    {
      accountId: 2,
      accountNo: "1002-345-112233",
      accountType: "적금",
      balance: 1200000,
      status: "정상",
      ownerName: "김연지",
    },
    {
      accountId: 3,
      accountNo: "1002-345-998877",
      accountType: "적금",
      balance: 397000,
      status: "휴면",
      ownerName: "김연지",
    },
  ];

  // flag 변수
  // default 값을 false로 만드는 것 권장
  // let showFullNo = true;
  const [showFullNo, setShowFullNo] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [hideAmount, setHideAmound] = useState(false);
  // return ( ) 바깥에서는 일반 자바스크립트처럼 // 로 주석을 적습니다.
  // return 뒤에 렌더링 될 부분을 적습니다.
  return (
    <>
      {/* <Counter /> */}
      <Header />
      <button className="btn-ghost" onClick={() => setShowFullNo(!showFullNo)}>
        {showFullNo ? "계좌번호 숨기기" : "계좌번호 보기"}
      </button>
      <button
        className="btn-ghost"
        onClick={() => setShowBalance(!showBalance)}
      >
        {showBalance ? "금액 보기" : "금액 숨기기"}
      </button>
      {/* <Clock /> */}
      <Panel title={"내 계좌"}>
        {accounts.map((account, index) => (
          <AccountCard
            key={index}
            accountNo={account.accountNo}
            accountType={account.accountType}
            balance={account.balance}
            status={account.status}
            showFullNo={showFullNo}
            showBalance={showBalance}
          />
        ))}
      </Panel>
      <Panel title={"최근 거래"}>
        <button
          className="btn-ghost"
          onClick={() => setHideAmound(!hideAmount)}
        >
          {hideAmount ? "금액 보기" : "금액 숨기기"}
        </button>
        {transactions.map((transaction, index) => (
          <TransactionRow
            key={index}
            txType={transaction.txType}
            amount={transaction.amount}
            category={transaction.category}
            memo={transaction.memo}
            counterparty={transaction.counterparty}
            txDatetime={transaction.txDatetime}
            hideAmount={hideAmount}
          />
        ))}
      </Panel>
    </>
  );
}

export default App;
