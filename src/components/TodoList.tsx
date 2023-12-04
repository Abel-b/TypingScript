import React, { useState } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import { FaTrash, FaClock } from "react-icons/fa";
interface item {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
}

const TodoList: React.FC = () => {
  const [todoItems, setTodoItems] = useState<item[]>([
    // { id: 1, text: "style todo app", completed: false },
  ]);
  const [newTask, setNewTask] = useState<string>("");

  const handleAdd = () => {
    if (newTask !== "" && newTask !== " ") {
      const newItem: item = {
        id: Date.now(),
        text: newTask,
        completed: false,
        createdAt: new Date().toLocaleTimeString(),
      };
      setTodoItems([...todoItems, newItem]);
    } else {
      alert("write some task description.");
    }
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

  const countCompleted = () => {
    let counter: number = 0;
    todoItems.map((item) => {
      if (item.completed) counter++;
    });

    return counter;
  };

  return (
    <div style={{ maxHeight: "500px", overflowY: "auto" }}>
      <ul>
        <Card>
          {todoItems.map((item) => (
            <>
              {!item.completed ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Card body>
                    <FaTrash
                      color="red"
                      onClick={() => {
                        const updatedItems = todoItems.filter(
                          (task) => task.id !== item.id
                        );
                        setTodoItems(updatedItems);
                      }}
                    />
                    <Badge style={{ marginLeft: 5 }}>
                      <FaClock /> {item.createdAt}
                    </Badge>
                  </Card>
                </div>
              ) : null}
              <li
                key={item.id}
                onClick={() => handleToggle(item.id)}
                style={{
                  textDecoration: item.completed ? "line-through" : "none",
                }}
              >
                {item.text}
              </li>
            </>
          ))}
        </Card>
      </ul>
      <input
        type="text"
        placeholder="Add a task here..."
        onChange={(e) => {
          setNewTask(e.target.value);
        }}
      />
      <Button
        style={{ marginLeft: 7 }}
        size="sm"
        variant="info"
        onClick={handleAdd}
      >
        Add
      </Button>
      <p
        style={{
          color: "#777", // Use a muted color for a disabled look
          fontSize: "1.3rem", // Use a smaller font size
          fontStyle: "italic", // Use italic for an informative look
        }}
      >
        Progress:{countCompleted()}/{todoItems.length}
        {countCompleted() === todoItems.length && todoItems.length !== 0
          ? "\n🎊You're Amazing at doing your job!🎊"
          : ""}
      </p>
    </div>
  );
};

export default TodoList;
