import { useState } from "react";

function Calendar({ todos, todayKey, selectedDate, onSelectDate }) {
  const today = new Date(`${todayKey}T00:00:00`);
  const [monthDate, setMonthDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, index) => {
    if (index < firstDay) return null;
    return formatDateKey(new Date(year, month, index - firstDay + 1));
  });

  return (
    <section className="calendar" aria-labelledby="calendar-heading">
      <div className="calendar-heading">
        <div>
          <p>MONTHLY VIEW</p>
          <h1 id="calendar-heading">일정 캘린더</h1>
        </div>
        <div className="calendar-month-controls">
          <button
            type="button"
            onClick={() => changeMonth(setMonthDate, -1)}
            aria-label="이전 달"
          >
            ‹
          </button>
          <strong>
            {year}년 {month + 1}월
          </strong>
          <button
            type="button"
            onClick={() => changeMonth(setMonthDate, 1)}
            aria-label="다음 달"
          >
            ›
          </button>
        </div>
      </div>
      <div className="calendar-weekdays" aria-hidden="true">
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="calendar-grid">
        {cells.map((dateKey, index) => {
          const dailyTodos = todos.filter((todo) => todo.date === dateKey);
          const isToday = dateKey === todayKey;
          const isSelected = dateKey === selectedDate;
          return dateKey ? (
            <button
              type="button"
              className={`calendar-day ${isToday ? "is-today" : ""} ${isSelected ? "is-selected" : ""}`}
              key={dateKey}
              onClick={() => {
                onSelectDate(dateKey);
              }}
              aria-label={`${formatDate(dateKey)} 할 일 ${dailyTodos.length}개`}
            >
              <strong>{new Date(`${dateKey}T00:00:00`).getDate()}</strong>
              {dailyTodos.length > 0 && (
                <span className="calendar-dots">
                  {dailyTodos.slice(0, 3).map((todo) => (
                    <i
                      className={todo.completed ? "completed" : ""}
                      key={todo.id}
                    />
                  ))}
                </span>
              )}
              {dailyTodos.length > 0 && <small>{dailyTodos.length}개</small>}
            </button>
          ) : (
            <span className="calendar-empty" key={`empty-${index}`} />
          );
        })}
      </div>
      <p className="calendar-hint">
        날짜를 누르면 해당 날짜의 할 일을 볼 수 있어요.
      </p>
    </section>
  );
}

function changeMonth(setMonthDate, amount) {
  setMonthDate(
    (currentDate) =>
      new Date(currentDate.getFullYear(), currentDate.getMonth() + amount, 1),
  );
}

function formatDateKey(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function formatDate(dateKey) {
  const date = new Date(`${dateKey}T00:00:00`);
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export default Calendar;
