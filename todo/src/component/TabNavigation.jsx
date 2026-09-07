function TabNavigation({ activeTab, onChangeTab }) {
  return (
    <nav className="tab-navigation" aria-label="화면 선택">
      <button
        type="button"
        className={activeTab === "todos" ? "active" : ""}
        onClick={() => onChangeTab("todos")}
        aria-selected={activeTab === "todos"}
      >
        할 일
      </button>
      <button
        type="button"
        className={activeTab === "dashboard" ? "active" : ""}
        onClick={() => onChangeTab("dashboard")}
        aria-selected={activeTab === "dashboard"}
      >
        대시보드
      </button>
      <button
        type="button"
        className={activeTab === "calendar" ? "active" : ""}
        onClick={() => onChangeTab("calendar")}
        aria-selected={activeTab === "calendar"}
      >
        캘린더
      </button>
    </nav>
  );
}

export default TabNavigation;
