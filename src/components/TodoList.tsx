import React, { useState } from "react";
import { Badge, Button, Card, Image, InputGroup, Form } from "react-bootstrap";
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
      setNewTask("");
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
        padding: 10,
      }}
    >
      {showLanding ? (
        <div
          className="landingContainer"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>iTodo</h2>
          <header style={{ display: "flex", alignItems: "center" }}>
            <Image
              src={todoLandingImg}
              thumbnail
              style={{ width: "50%", marginLeft: 7 }}
            />
            <section className="features">
              <div
                className="feature"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h5>Stay Organized</h5>
                <p style={{ textAlign: "center" }}>
                  Keep track of your daily tasks and never miss a deadline.
                </p>
              </div>
            </section>
          </header>
          <header style={{ display: "flex", alignItems: "center" }}>
            <section className="features">
              <div
                className="feature"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h5>Easy to Use</h5>
                <p style={{ textAlign: "center" }}>
                  Intuitive design for a seamless experience.
                </p>
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
              overflowY: "auto",
              //   display: "flex",
            }}
          >
            {todoItems.length === 0 ? (
              <p style={{ color: "#777" }}>No tasks today</p>
            ) : null}
            {todoItems.length > 0 &&
              todoItems.map((item) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <h6>
                    <FaTrash
                      style={{ marginRight: 10 }}
                      color="red"
                      onClick={() => {
                        const updatedItems = todoItems.filter(
                          (task) => task.id !== item.id
                        );
                        setTodoItems(updatedItems);
                      }}
                    />
                  </h6>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <h6>
                      {item.completed ? (
                        <MdCheckCircle
                          onClick={() => handleToggle(item.id)}
                          color="green"
                        />
                      ) : (
                        <MdRadioButtonUnchecked
                          onClick={() => handleToggle(item.id)}
                        />
                      )}
                    </h6>
                    <Card
                      key={item.id}
                      onClick={() => handleToggle(item.id)}
                      style={{
                        textDecoration: item.completed
                          ? "line-through"
                          : "none",
                        padding: 10,
                        borderRadius: 6,
                        marginTop: 7,
                      }}
                      bg="info"
                      body
                    >
                      {!item.completed ? (
                        <p style={{ fontSize: 9 }}>
                          <FaClock /> {item.createdAt}
                        </p>
                      ) : null}
                      {item.text}
                    </Card>
                  </div>
                </div>
              ))}
          </div>
        </ul>
        <InputGroup className="mb-3" style={{ display: "flex" }}>
          <Form.Control
            placeholder="Add a task here..."
            value={newTask}
            onChange={(e) => {
              setNewTask(e.target.value);
            }}
          />
          <Button
            variant="info"
            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            onClick={handleAdd}
          >
            Add
          </Button>
        </InputGroup>
        <h4
          style={{
            color: "#777",
            fontSize: "1.3rem",
            fontStyle: "italic",
            textAlign: "center",
          }}
        >
          Progress:{countCompleted()}/{todoItems.length}
          {countCompleted() === todoItems.length && todoItems.length !== 0
            ? "\n🎊You're Amazing at doing your job!🎊"
            : ""}
        </h4>
      </div>
    </div>
  );
};

export default TodoList;
