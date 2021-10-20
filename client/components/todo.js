import { useState, useEffect } from "react";
import styles from "../styles/Todo.module.css";
import Image from "next/image";
import { v4 as uuid } from "uuid";

export default function Todo() {
  const [todoObject, setTodoObject] = useState({
    id: uuid(),
    todo: "",
    minutes: "",
    completed: false,
  });

  const [todoArray, setTodoArray] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [minus, setMinus] = useState(false);
  const [showCompleted, setShowCompleted] = useState(true);

  const addTodo = () => {
    setShowInput(!showInput);
    setMinus(!minus);
  };

  const handleChange = (e) => {
    setTodoObject({
      ...todoObject,
      [e.target.name]: e.target.value,
    });
  };

  const completeTodo = (id) => {
    let updatedTodos = todoArray.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    setTodoArray(updatedTodos);
    console.log(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(todoArray));
  };

  const deleteTodo = (id) => {
    let updatedTodo = todoArray.filter((todo) => todo.id !== id);
    setTodoArray(updatedTodo);
    localStorage.setItem("todos", JSON.stringify(todoArray));
  };

  const numbersOnly = (e) => {
    const minutes = e.target.validity.valid
      ? e.target.value
      : todoObject.minutes;
    setTodoObject({
      ...todoObject,
      minutes: minutes,
    });
  };

  useEffect(() => {
    getTodos();
    console.log("useEffect");
  }, []);

  const getTodos = () => {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    setTodoArray(todos);
    console.log(todos);
  };

  const submitTask = async (e) => {
    e.preventDefault();
    setTodoObject({
      ...todoObject,
      id: uuid(),
      minutes: "",
    });
    todoArray.push(todoObject);
    localStorage.setItem("todos", JSON.stringify(todoArray));
    getTodos();
    e.target.reset();
    document.getElementById("input").focus();
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>Task List</h3>
        <div className={styles.plus}>
          {!minus ? (
            <button className={styles.plusButton} onClick={addTodo}>
              <Image src="/plus.svg" width={25} height={25} />
            </button>
          ) : (
            <button className={styles.plusButton} onClick={addTodo}>
              <div className={styles.minus}></div>
            </button>
          )}
        </div>
      </div>
      <div className={styles.taskList}>
        {showInput && (
          <form onSubmit={submitTask}>
            <div className={styles.inputContainer}>
              <div
                className={styles.deleteIcon}
                onClick={() => setShowInput(!showInput)}
              >
                <Image src="/delete.svg" width={15} height={15} />
              </div>
              <input
                className={styles.input}
                id="input"
                name="todo"
                autoFocus={true}
                placeholder="Enter Task"
                onChange={handleChange}
              />
              <input
                name="minutes"
                className={styles.timeInput}
                placeholder="Mins"
                pattern="[0-9]*"
                value={todoObject.minutes}
                onInput={numbersOnly}
              />
              <button className={styles.hiddenButton} type="submit">
                submit
              </button>
            </div>
          </form>
        )}
        {todoArray.map((t) => (
          <div key={`${t.id}`}>
            {t.completed === false && (
              <div className={styles.taskContainer}>
                <div className={styles.taskDivOne}>
                  <button
                    onClick={() => completeTodo(t.id)}
                    className={styles.checkmarkButton}
                  >
                    <span className={styles.checkmark}>
                      <div className={styles.checkmarkCircle}></div>
                      <div className={styles.checkmarkStem}></div>
                      <div className={styles.checkmarkKick}></div>
                    </span>
                  </button>
                </div>
                <div className={styles.taskDivTwo}>{t.todo}</div>
                <div className={styles.taskDivThree}>{t.minutes}</div>
                <button
                  className={styles.deleteButton}
                  onClick={() => deleteTodo(t.id)}
                >
                  <Image src="/delete.svg" width={15} height={15} />
                </button>
              </div>
            )}
          </div>
        ))}
        <div className={styles.completedTitle}>
          <button
            className={styles.completedButton}
            onClick={() => setShowCompleted(!showCompleted)}
          >
            {showCompleted ? ('Hide Completed') : ('Show Completed')}
            <Image src='/expand2.svg' width={15} height={15} />
          </button>
        </div>
        {todoArray.map((t) => (
          <div className={styles.completedContainer} key={`${t.id}`}>
            {t.completed === true && showCompleted === true && (
              <div className={styles.taskContainer}>
                <div className={styles.taskDivOne}>
                  <button
                    onClick={() => completeTodo(t.id)}
                    className={styles.checkmarkButton}
                  >
                    <Image src="/up.svg" width={18} height={18} />
                  </button>
                </div>
                <div className={styles.taskDivTwo}>{t.todo}</div>
                <div className={styles.taskDivThree}>{t.minutes}</div>
                <button
                  className={styles.deleteButton}
                  onClick={() => deleteTodo(t.id)}
                >
                  <Image src="/delete.svg" width={14} height={14} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
