import React, { useState } from "react";
import { Badge, Button, Card, Image } from "react-bootstrap";
import { FaTrash, FaClock } from "react-icons/fa";
import { MdRadioButtonUnchecked, MdCheckCircle } from "react-icons/md";
import todoLandingImg from "../images/todo_landing_nothing.jpg";
import todoLandingImg2 from "../images/todo_landing_2.jpg";
interface item {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
}

const TodoList: React.FC = () => {
  const [todoItems, setTodoItems] = useState<item[]>([]);
  const [showLanding, setShowLanding] = useState<boolean>(true);
  const [newTask, setNewTask] = useState<string>("");

  const handleAdd = () => {
    if (newTask !== "" && newTask !== " ") {
      setShowLanding(false);
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
    <div
      style={{
        position: "relative",
        borderRadius: 10,
        backgroundColor: "#f2f2f2",
        minHeight: 500,
      }}
    >
      {showLanding ? (
        <div
          className="landingContainer"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>iTodo App</h2>
          <header style={{ display: "flex", alignItems: "center" }}>
            <Image
              src={todoLandingImg}
              thumbnail
              style={{ width: "50%", marginRight: 7 }}
            />
            <section className="features">
              <div className="feature">
                <h5>Stay Organized</h5>
                <p>Keep track of your daily tasks and never miss a deadline.</p>
              </div>
            </section>
          </header>
          <header style={{ display: "flex", alignItems: "center" }}>
            <section className="features">
              <div className="feature">
                <h5>Easy to Use</h5>
                <p>Intuitive design for a seamless experience.</p>
              </div>
            </section>
            <Image
              src={todoLandingImg2}
              thumbnail
              style={{ width: "50%", marginRight: 7 }}
            />
          </header>
        </div>
      ) : null}
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <h2>Tasks</h2>
        </div>
        <ul>
          <div
            style={{
              maxHeight: "360px",
              overflowX: "visible",
              overflowY: "auto",
            }}
          >
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
                  {item.completed ? (
                    <MdCheckCircle color="green" />
                  ) : (
                    <MdRadioButtonUnchecked />
                  )}
                  {item.text}
                </li>
              </>
            ))}
          </div>
        </ul>
        <div style={{ position: "absolute", bottom: 0 }}>
          <div style={{ display: "flex" }}>
            <input
              type="text"
              placeholder="Add a task here..."
              onChange={(e) => {
                setNewTask(e.target.value);
              }}
            />
            <Button
              style={{ marginLeft: 7 }}
              variant="info"
              onClick={handleAdd}
            >
              Add
            </Button>
          </div>
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
      </div>
    </div>
  );
};

export default TodoList;
