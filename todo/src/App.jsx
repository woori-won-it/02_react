import { useState } from "react";
import "./App.css";
import Header from "./component/Header";
import DateNavigator from "./component/DateNavigator";
import TabNavigation from "./component/TabNavigation";
import TodoForm from "./component/TodoForm";
import TodoList from "./component/TodoList";
import Dashboard from "./component/Dashboard";
import Calendar from "./component/Calendar";

const getDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const shiftDate = (dateKey, amount) => {
  const date = new Date(`${dateKey}T00:00:00`);
  date.setDate(date.getDate() + amount);
  return getDateKey(date);
};

function App() {
  const todayKey = getDateKey(new Date());
  const [activeTab, setActiveTab] = useState("todos");
  const [selectedDate, setSelectedDate] = useState(todayKey);
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "어제 못 끝낸 일 정리하기",
      date: shiftDate(todayKey, -1),
      completed: false,
    },
    { id: 2, text: "오늘 할 일 정리하기", date: todayKey, completed: false },
    { id: 3, text: "물 충분히 마시기", date: todayKey, completed: true },
  ]);

  const addTodo = (text) => {
    setTodos((currentTodos) => [
      ...currentTodos,
      { id: Date.now(), text, date: selectedDate, completed: false },
    ]);
  };

  const toggleTodo = (id) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id, text) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) => (todo.id === id ? { ...todo, text } : todo)),
    );
  };

  const openDateTodos = (dateKey) => {
    setSelectedDate(dateKey);
    setActiveTab("todos");
  };

  const todayTodos = todos.filter((todo) => todo.date === selectedDate);
  const overdueTodos = todos.filter(
    (todo) => todo.date < selectedDate && !todo.completed,
  );
  const completedCount = todayTodos.filter((todo) => todo.completed).length;
  const completionRate = todayTodos.length
    ? Math.round((completedCount / todayTodos.length) * 100)
    : 0;

  return (
    <main className="app-shell">
      <div className="todo-app">
        <TabNavigation activeTab={activeTab} onChangeTab={setActiveTab} />
        {activeTab === "todos" ? (
          <>
            <DateNavigator
              selectedDate={selectedDate}
              todayKey={todayKey}
              onChangeDate={setSelectedDate}
            />
            <Header completionRate={completionRate} />
            <TodoForm onAddTodo={addTodo} />
            <TodoList
              todos={todayTodos}
              title="오늘의 할 일"
              onToggleTodo={toggleTodo}
              onDeleteTodo={deleteTodo}
              onUpdateTodo={updateTodo}
            />
            {overdueTodos.length > 0 && (
              <TodoList
                todos={overdueTodos}
                title="밀린 할 일"
                description="이전에 완료하지 못한 일들을 모았어요."
                onToggleTodo={toggleTodo}
                onDeleteTodo={deleteTodo}
                onUpdateTodo={updateTodo}
                showDate
              />
            )}
          </>
        ) : activeTab === "dashboard" ? (
          <Dashboard todos={todos} todayKey={todayKey} />
        ) : (
          <Calendar
            todos={todos}
            todayKey={todayKey}
            selectedDate={selectedDate}
            onSelectDate={openDateTodos}
          />
        )}
      </div>
    </main>
  );
}

export default App;
