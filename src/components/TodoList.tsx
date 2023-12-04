import React, { useState } from "react";

interface item {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todoItems, setTodoItems] = useState<item[]>([
    { id: 1, text: "style todo app", completed: false },
  ]);
  const [newTask, setNewTask] = useState<string>("");

  const handleAdd = () => {
    const newItem: item = { id: Date.now(), text: newTask, completed: false };
    setTodoItems([...todoItems, newItem]);
  };
  const handleToggle = (id: number) => {
    setTodoItems(
      todoItems.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };

  return (
    <div>
      <h2>Todo App</h2>
      <ul>
        {todoItems.map((item) => (
          <li
            key={item.id}
            onClick={() => handleToggle(item.id)}
            style={{ textDecoration: item.completed ? "line-through" : "none" }}
          >
            {item.text}
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Add a task here..."
        onChange={(e) => {
          setNewTask(e.target.value);
        }}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default TodoList;