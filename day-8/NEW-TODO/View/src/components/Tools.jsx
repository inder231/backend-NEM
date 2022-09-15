import React from "react";
import styles from "../components/todo.module.css";
const Tools = ({ todo, onDelete,updateStatus }) => {
  return (
    <React.Fragment>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={todo.status}
        onChange={() => updateStatus(todo._id,todo.status)}
      />
      <p className={todo.status ? styles.striked : styles.textStriked}>
        {todo.title}
      </p>
      <button
        className={styles.deletebtn}
        onClick={() => {
          onDelete(todo._id);
        }}
      >
        X
      </button>
    </React.Fragment>
  );
};

export default Tools;
