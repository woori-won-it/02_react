import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";

function App() {
  // 화면이 렌더링 되기 위해 필요로 하는 값(data)을 적습니다.
  const account = {
    bankName: "우리WON뱅킹",
    accountNo: "1002-345-678901",
    balance: 123456000,
  };

  // return ( ) 바깥에서는 일반 자바스크립트처럼 // 로 주석을 적습니다.
  // return 뒤에 렌더링 될 부분을 적습니다.
  return (
    <>
      {/* class 는 JS의 예약어이므로 JSX에서는 className으로 대신 사용합니다.*/}
      <p className="header">- 상태: 정상</p>
      <p>- 은행명: {account.bankName} </p>
      <p>- 계좌번호: {account.accountNo} </p>
      <p>- 잔액: {account.balance}원</p>
    </>
  );
}

export default App;
