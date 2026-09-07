import { useState } from "react";

function Dashboard({ todos, todayKey }) {
  const [period, setPeriod] = useState("week");
  const days = getPeriodDays(todayKey, period);
  const periodTodos = todos.filter((todo) => days.includes(todo.date));
  const completedTodos = periodTodos.filter((todo) => todo.completed);
  const completionRate = periodTodos.length
    ? Math.round((completedTodos.length / periodTodos.length) * 100)
    : 0;
  const periodLabel = period === "week" ? "최근 7일" : "이번 달";

  return (
    <section className="dashboard" aria-labelledby="dashboard-heading">
      <div className="dashboard-intro">
        <p>{period === "week" ? "WEEKLY SUMMARY" : "MONTHLY SUMMARY"}</p>
        <h1 id="dashboard-heading">{periodLabel} 기록</h1>
        <span>기간별 할 일 달성 현황을 한눈에 확인해 보세요.</span>
      </div>

      <div
        className="dashboard-filters"
        role="group"
        aria-label="대시보드 기간 선택"
      >
        <button
          type="button"
          className={period === "week" ? "active" : ""}
          onClick={() => setPeriod("week")}
        >
          최근 7일
        </button>
        <button
          type="button"
          className={period === "month" ? "active" : ""}
          onClick={() => setPeriod("month")}
        >
          이번 달
        </button>
      </div>

      <div className="dashboard-summary">
        <div className="summary-card summary-card-primary">
          <span>{periodLabel} 달성률</span>
          <strong>{completionRate}%</strong>
          <div className="summary-progress" aria-hidden="true">
            <span style={{ width: `${completionRate}%` }} />
          </div>
        </div>
        <div className="summary-card">
          <span>완료한 할 일</span>
          <strong>{completedTodos.length}개</strong>
          <small>전체 {periodTodos.length}개 중</small>
        </div>
      </div>

      <div className="weekly-chart">
        <div className="dashboard-section-heading">
          <h2>날짜별 달성률</h2>
          <span>{periodLabel}</span>
        </div>
        <div className="chart-list">
          {days.map((dateKey) => {
            const dailyTodos = todos.filter((todo) => todo.date === dateKey);
            const dailyCompleted = dailyTodos.filter(
              (todo) => todo.completed,
            ).length;
            const dailyRate = dailyTodos.length
              ? Math.round((dailyCompleted / dailyTodos.length) * 100)
              : 0;

            return (
              <div className="chart-row" key={dateKey}>
                <span className="chart-date">{formatDay(dateKey)}</span>
                <div
                  className="chart-track"
                  aria-label={`${formatDay(dateKey)} ${dailyRate}% 완료`}
                >
                  <span style={{ width: `${dailyRate}%` }} />
                </div>
                <strong>{dailyTodos.length ? `${dailyRate}%` : "-"}</strong>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function getPeriodDays(todayKey, period) {
  if (period === "week") {
    return Array.from({ length: 7 }, (_, index) =>
      shiftDate(todayKey, index - 6),
    );
  }

  const today = new Date(`${todayKey}T00:00:00`);
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const daysInMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0,
  ).getDate();

  return Array.from({ length: daysInMonth }, (_, index) =>
    formatDateKey(
      new Date(firstDay.getFullYear(), firstDay.getMonth(), index + 1),
    ),
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

function formatDay(dateKey) {
  const date = new Date(`${dateKey}T00:00:00`);
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

export default Dashboard;
