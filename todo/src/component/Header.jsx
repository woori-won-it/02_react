import "./header.css";

function Header({ selectedDate, completionRate }) {
  return (
    <header className="header">
      <div>
        <h1>
          안녕하세요, 오늘도
          <br />
          차근차근 해볼까요?
        </h1>
        <p
          className="progress-message"
          aria-label={`오늘의 할 일 ${completionRate}% 완료`}
        >
          {completionRate}% 완료했어요!
        </p>
      </div>
    </header>
  );
}

export default Header;
