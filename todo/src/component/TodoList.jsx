import TodoItem from "./TodoItem";

function TodoList({
  todos,
  title,
  description,
  onToggleTodo,
  onDeleteTodo,
  onUpdateTodo,
  showDate = false,
}) {
  return (
    <section className="todo-section" aria-labelledby={`${title}-heading`}>
      <div className="section-heading">
        <div>
          <h2 id={`${title}-heading`}>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        <span>{todos.length}개</span>
      </div>
      {todos.length > 0 ? (
        <ul className="todo-list">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggleTodo}
              onDelete={onDeleteTodo}
              onUpdate={onUpdateTodo}
              showDate={showDate}
            />
          ))}
        </ul>
      ) : (
        <div className="empty-state">
          <span aria-hidden="true">✓</span>
          <p>아직 등록된 할 일이 없어요.</p>
          <small>위 입력창에 오늘의 목표를 적어보세요.</small>
        </div>
      )}
    </section>
  );
}

export default TodoList;
