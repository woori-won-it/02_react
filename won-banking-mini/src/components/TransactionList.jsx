// 사용할 컴포넌트, 함수, 변수 import
import { useEffect, useRef, useState } from "react";
import TransactionRow from "./TransactionRow";
import { transactions } from "../data/mockData.js";
import Chip from "./Chip";
import { formatWon } from "../utils/format.js";

// 거래 종류 필터 옵션
const TYPE_OPTIONS = ["전체", "입금", "출금"];
// 카테고리 필터 옵션
const CATEGORY_OPTIONS = [
  "전체",
  "식비",
  "교통",
  "쇼핑",
  "급여",
  "이체",
  "의료",
  "통신",
];

// 컴포넌트 함수형으로 작성
function TransactionList({ hideAmount }) {
  const [typeFilter, setTypeFilter] = useState("전체");
  const [categoryFilter, setCategoryFilter] = useState("전체");
  const [loading, setLoading] = useState(true);
  const categoryChipsRef = useRef(null);
  const dragStartRef = useRef({ x: 0, scrollLeft: 0 });
  const draggedRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const visible = transactions.filter(
    (tx) =>
      (typeFilter === "전체" || tx.txType === typeFilter) &&
      (categoryFilter === "전체" || tx.category === categoryFilter),
  );
  const visibleTotal = visible.reduce((total, transaction) => {
    const signedAmount =
      transaction.txType === "입금" ? transaction.amount : -transaction.amount;
    return total + signedAmount;
  }, 0);

  function handlePointerDown(event) {
    if (event.button !== 0) return;
    dragStartRef.current = {
      x: event.clientX,
      scrollLeft: categoryChipsRef.current.scrollLeft,
    };
    draggedRef.current = false;
    setIsDragging(true);
  }

  function handlePointerMove(event) {
    if (!isDragging) return;
    const distance = event.clientX - dragStartRef.current.x;
    if (Math.abs(distance) > 4) draggedRef.current = true;
    categoryChipsRef.current.scrollLeft =
      dragStartRef.current.scrollLeft - distance;
  }

  function handlePointerUp() {
    setIsDragging(false);
  }

  function handleChipClickCapture(event) {
    if (draggedRef.current) {
      event.preventDefault();
      event.stopPropagation();
      draggedRef.current = false;
    }
  }

  if (loading) return <p className="muted">거래 내역을 불러오는 중...</p>;

  return (
    <>
      <div>
        <div className="chips">
          {TYPE_OPTIONS.map((option) => (
            <Chip
              key={option}
              text={option}
              active={typeFilter === option}
              onClick={() => setTypeFilter(option)}
            />
          ))}
        </div>
        <div
          ref={categoryChipsRef}
          className={`chips category-chips${isDragging ? " is-dragging" : ""}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onClickCapture={handleChipClickCapture}
        >
          {CATEGORY_OPTIONS.map((option) => (
            <Chip
              key={option}
              text={option}
              active={categoryFilter === option}
              onClick={() => setCategoryFilter(option)}
            />
          ))}
        </div>
      </div>
      <div className="summary">
        총 {visible.length}건 · 합계 {formatWon(Math.abs(visibleTotal))}
      </div>
      <div className="transaction-list">
        {visible.length > 0 ? (
          visible.map((transaction) => (
            <TransactionRow
              key={transaction.txId}
              txType={transaction.txType}
              amount={transaction.amount}
              category={transaction.category}
              memo={transaction.memo}
              counterparty={transaction.counterparty}
              txDatetime={transaction.txDatetime}
              hideAmount={hideAmount}
            />
          ))
        ) : (
          <p className="muted">조건에 맞는 거래 내역이 없습니다.</p>
        )}
      </div>
    </>
  );
}

// 컴포넌트, 함수, 변수 등을 외부에서 사용할 수 있게 export
export default TransactionList;
