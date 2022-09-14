import React, { useState, useEffect } from "react";
import styles from "../components/todo.module.css";
import Todoitems from "./Todoitems";
import axios from "axios";
const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setnewTodo] = useState("");
  const [page, setpage] = useState(1);
  const getTodos = () => {
    return axios
      .get(`http://localhost:8000/todos?page=${page}&limit=5`)
      .then((res) => setTodos(res.data.todos))
      .catch((err) => console.log(err.message));
  };
  useEffect(() => {
    getTodos();
  }, [page]);

  const saveInfo = () => {
    axios
      .post("http://localhost:8000/todos/create", { title: newTodo })
      .then((res) => res.status === 201 && getTodos())
      .catch((err) => console.log(err.message));
  };
  const onDelete = (id) => {
    axios
      .delete(`http://localhost:8000/todos/${id}`)
      .then((res) => res.status === 200 && getTodos())
      .catch((err) => console.log(err.message));
  };
  const updateStatus = (id, status) => {
    axios
      .patch(`http://localhost:8000/todos/${id}`, { status: !status })
      .then((res) => res.status === 201 && getTodos())
      .catch((err) => console.log(err));
  };
  return (
    <div>
      Todos
      <div>
        <button
          disabled={page <= 1}
          onClick={() => setpage(page - 1)}
        >{`<`}</button>
        <input
          placeholder="Enter todo here..."
          className={styles.inputbox}
          onChange={(e) => setnewTodo(e.target.value)}
        />
        <button className={styles.addbtn} onClick={saveInfo}>
          Save
        </button>
        <button
          disabled={page > 2}
          onClick={() => setpage(page + 1)}
        >{`>`}</button>
        <Todoitems
          updateStatus={updateStatus}
          onDelete={onDelete}
          todos={todos}
          setTodos={setTodos}
        />
      </div>
    </div>
  );
};

export default Todos;
