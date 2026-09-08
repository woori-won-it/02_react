import { useState } from "react";
import "./App.css";
import Clock from "./components/Clock.jsx";
import Counter from "./components/Counter.jsx";
import AccountCard from "./components/AccountCard.jsx";
import Panel from "./components/Panel.jsx";
import Header from "./components/Header.jsx";
import { accounts, transactions } from "./data/mockData.js";
import TransactionRow from "./components/TransactionRow.jsx";
import TotalBalance from "./components/TotalBalance.jsx";
import ExchangeRate from "./components/ExcahgeRate.jsx";

function App() {
  // 화면이 렌더링 되기 위해 필요로 하는 값(data)을 적습니다.
  // flag 변수
  // default 값을 false로 만드는 것 권장
  // let showFullNo = true;
  const [showFullNo, setShowFullNo] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [hideAmount, setHideAmound] = useState(false);
  const [accountList, setAccountList] = useState(() => accounts);
  const totalBalance = accountList.reduce(
    (total, account) => total + account.balance,
    0,
  );
  // accounts의 특정 위치의 balance를 변경하는 함수
  // accountId라는 고유key로 특정 고객의 balance를 변경
  // 입력받은 accountId가 일치하는 고객의 계좌 dict에서만
  // map 함수를 가지고 특정 dict의 모든 값-value에 접근해서
  // balance 라는 key에만 10000을 더합니다.
  function handleDeposit(accountId) {
    setAccountList((accounts) =>
      accounts.map((a) =>
        a.accountId === accountId ? { ...a, balance: a.balance + 10000 } : a,
      ),
    );
  }

  // return ( ) 바깥에서는 일반 자바스크립트처럼 // 로 주석을 적습니다.
  // return 뒤에 렌더링 될 부분을 적습니다.
  return (
    <>
      {/* <Counter /> */}
      <Clock />
      <Header />
      <div className="toolbar">
        <button
          className="btn-ghost"
          onClick={() => setShowFullNo(!showFullNo)}
        >
          {showFullNo ? "계좌번호 숨기기" : "계좌번호 보기"}
        </button>
        <button
          className="btn-ghost"
          onClick={() => setShowBalance(!showBalance)}
        >
          {showBalance ? "금액 보기" : "금액 숨기기"}
        </button>
      </div>
      <Panel>
        <TotalBalance totalBalance={totalBalance} showBalance={showBalance} />
      </Panel>
      <Panel title="내 계좌">
        {accountList.map((account) => (
          <AccountCard
            key={account.accountId}
            accountNo={account.accountNo}
            accountType={account.accountType}
            balance={account.balance}
            status={account.status}
            showFullNo={showFullNo}
            showBalance={showBalance}
            onDeposit={() => handleDeposit(account.accountId)}
          />
        ))}
      </Panel>
      <Panel title="최근 거래">
        <div className="toolbar">
          <button
            className="btn-ghost"
            onClick={() => setHideAmound(!hideAmount)}
          >
            {hideAmount ? "금액 보기" : "금액 숨기기"}
          </button>
        </div>
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
      <Panel title="오늘의 환율">
        <ExchangeRate />
      </Panel>
    </>
  );
}

export default App;
