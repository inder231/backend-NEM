import React from "react";
import styles from "../components/todo.module.css";
import Tools from "./Tools";

const Todoitems = ({ updateStatus, todos, setTodos,onDelete }) => {
 
  return (
    <div className={styles.maindiv}>
      {todos?.length > 0 &&
        todos?.map((todo, i) => {
          if (todo.title.length > 0) {
            return (
              <div key={i} className={styles.todolistbox}>
                <Tools updateStatus={updateStatus} todo={todo} onDelete={onDelete} />
              </div>
            );
          }
        })}
    </div>
  );
};

export default Todoitems;
