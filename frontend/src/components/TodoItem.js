import React from "react";
import axios from "axios";

const TodoItem = (props) => {
  const handleToggle = (todo) => {
    try {
      axios
        .put(`${props.API_URL}/todos/${todo._id}`, {
          isCompleted: !todo.isCompleted,
        })
        .then((response) => {
          props.setTodos((prevTodos) =>
            prevTodos.map((t) => (t._id === todo._id ? response.data : t))
          );
          props.setSuccessMessage("Status change successfully!");
          setTimeout(() => props.setSuccessMessage(""), 3000);
        });
    } catch (err) {
      props.setErrorMessage("Error in changing status.");
      setTimeout(() => props.setErrorMessage(""), 5000);
    }
  };

  const handleDeleteClick = (todo) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete "${todo.title}"?`
    );
    if (isConfirmed) {
      handleDelete(todo);
    }
  };

  const handleDelete = (todo) => {
    try {
      axios.delete(`${props.API_URL}/todos/${todo._id}`);
      props.setTodos((prevTodos) =>
        prevTodos.filter((t) => t._id !== todo._id)
      );
      props.setSuccessMessage("Todo item deleted successfully!");
      setTimeout(() => props.setSuccessMessage(""), 3000);
    } catch (err) {
      props.setErrorMessage(
        "Failed to delete the todo item. Please try again."
      );
      setTimeout(() => props.setErrorMessage(""), 5000);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.todos.length ? props.todos.map((todo) => (
          <tr key={todo._id}>
            <td>{todo.title}</td>
            <td>{todo.description ? todo.description : "-"}</td>
            <td>{todo.isCompleted ? "Completed" : "Pending"}</td>
            <td>
              <div className="todo-actions">
                <button onClick={() => handleToggle(todo)}>
                  {todo.isCompleted ? "Mark as Pending" : "Mark as Completed"}
                </button>
                <button
                  className="edit-btn"
                  onClick={() => props.handleEdit(todo)}
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button className="delete-btn">
                  <i
                    className="fas fa-trash-alt"
                    onClick={() => handleDeleteClick(todo)}
                  ></i>
                </button>
              </div>
            </td>
          </tr>
        )):
        <tr>
          <td>No records found.</td>
        </tr>
        }
      </tbody>
    </table>
  );
};

export default TodoItem;
