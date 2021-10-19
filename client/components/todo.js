import { useState, useEffect } from "react";
import styles from "../styles/Todo.module.css";
import Task from "./task.js";
import Image from "next/image";
import { v4 as uuid } from "uuid";

export default function Todo() {
  const [todoObject, setTodoObject] = useState({
    id: uuid(),
    todo: "",
    minutes: '',
  });
  const [todoArray, setTodoArray] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [completed, setCompleted] = useState(false);

  const addTodo = () => {
    setShowInput(true);
  };

  const handleChange = (e) => {
    setTodoObject({
      ...todoObject,
      [e.target.name]: e.target.value,
    });
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

  const submitTask = async (e) => {
    e.preventDefault();
    setTodoObject({
      ...todoObject,
      id: uuid(),
    });
    todoArray.push(todoObject);
    localStorage.setItem("todos", JSON.stringify(todoArray));
    getTodos();
    e.target.reset();
    setTodoObject({
      ...todoObject,
      minutes: ''
    })
    document.getElementById("input").focus();
  };

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

  const deleteTodo = (id) => {
    let updatedTodo = todoArray.filter((todo) => todo.id !== id);
    setTodoArray(updatedTodo);
    localStorage.setItem("todos", JSON.stringify(todoArray));
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>Task List</h3>
        <div className={styles.plus}>
          <button className={styles.plusButton} onClick={addTodo}>
            <Image src="/plus.svg" width={25} height={25} />
          </button>
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
            <div className={styles.taskContainer}>
              <div className={styles.taskDivOne}>
                <input type="checkbox" />
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
          </div>
        ))}
      </div>
    </div>
  );
}
