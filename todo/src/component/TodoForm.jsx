import { useState } from "react";

function TodoForm({ onAddTodo }) {
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedText = text.trim();

    if (!trimmedText) return;

    onAddTodo(trimmedText);
    setText("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="todo-input">
        할 일 입력
      </label>
      <input
        id="todo-input"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="새로운 할 일을 입력해 주세요"
        maxLength={80}
      />
      <button type="submit" aria-label="할 일 추가">
        +
      </button>
    </form>
  );
}

export default TodoForm;
