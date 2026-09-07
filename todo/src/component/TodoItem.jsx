import { useState } from "react";

function TodoItem({ todo, onToggle, onDelete, onUpdate, showDate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const saveEdit = () => {
    const trimmedText = editText.trim();
    if (!trimmedText) return;

    onUpdate(todo.id, trimmedText);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <li className={`todo-item ${todo.completed ? "is-completed" : ""}`}>
      <button
        className="check-button"
        type="button"
        onClick={() => onToggle(todo.id)}
        aria-label={
          todo.completed ? `${todo.text} 완료 취소` : `${todo.text} 완료`
        }
        aria-pressed={todo.completed}
      />
      {isEditing ? (
        <input
          className="edit-input"
          value={editText}
          onChange={(event) => setEditText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") saveEdit();
            if (event.key === "Escape") cancelEdit();
          }}
          autoFocus
          maxLength={80}
          aria-label="할 일 수정"
        />
      ) : (
        <div className="todo-copy">
          <span className="todo-text">{todo.text}</span>
          {showDate && (
            <small className="todo-date">
              등록일 · {formatTodoDate(todo.date)}
            </small>
          )}
        </div>
      )}
      {isEditing ? (
        <div className="edit-actions">
          <button type="button" onClick={saveEdit}>
            저장
          </button>
          <button type="button" onClick={cancelEdit}>
            취소
          </button>
        </div>
      ) : (
        <button
          className="edit-button"
          type="button"
          onClick={() => setIsEditing(true)}
          aria-label={`${todo.text} 수정`}
        >
          ✎
        </button>
      )}
      <button
        className="delete-button"
        type="button"
        onClick={() => onDelete(todo.id)}
        aria-label={`${todo.text} 삭제`}
      >
        <span aria-hidden="true">🗑</span>
      </button>
    </li>
  );
}

function formatTodoDate(dateKey) {
  const date = new Date(`${dateKey}T00:00:00`);
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export default TodoItem;
