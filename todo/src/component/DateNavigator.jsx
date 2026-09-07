function DateNavigator({ selectedDate, todayKey, onChangeDate }) {
  const isToday = selectedDate === todayKey;

  return (
    <nav className="date-navigator" aria-label="날짜 이동">
      <div className="date-controls">
        <button
          type="button"
          className="date-arrow"
          onClick={() => onChangeDate(shiftDate(selectedDate, -1))}
          aria-label="이전 날짜"
        >
          ‹
        </button>
        <div className="selected-date">
          <strong>{formatDate(selectedDate)}</strong>
        </div>
        <button
          type="button"
          className="date-arrow"
          onClick={() => onChangeDate(shiftDate(selectedDate, 1))}
          aria-label="다음 날짜"
        >
          ›
        </button>
      </div>
      <button
        type="button"
        className="today-button"
        onClick={() => onChangeDate(todayKey)}
        aria-current={isToday ? "date" : undefined}
      >
        오늘
      </button>
    </nav>
  );
}

function shiftDate(dateKey, amount) {
  const date = new Date(`${dateKey}T00:00:00`);
  date.setDate(date.getDate() + amount);
  return formatDateKey(date);
}

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDate(dateKey) {
  const date = new Date(`${dateKey}T00:00:00`);
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export default DateNavigator;
