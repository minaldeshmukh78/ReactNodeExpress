import React, { useState } from "react";
import axios from "axios";

const TodoForm = (props) => {
  const [errors, setErrors] = useState({ title: "" });

  const validateForm = () => {
    let valid = true;
    let titleError = "";

    if (!props.title.trim()) {
      titleError = "Please enter title.";
      valid = false;
    }

    setErrors({ title: titleError });
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      props.setAddUpdateTodo(false);
      if (props.selectedID) {
        props.handleEditDetails();
      } else {
        handleAddDetails();
      }
    }
  };

  const handleAddDetails = () => {
    try {
      let { title, description } = props;
      axios
        .post(`${props.API_URL}/todos`, { title, description })
        .then((response) => {
          props.setTodos((prevTodos) => [...prevTodos, response.data]);
          props.setTitle("");
          props.setDescription("");
          props.setSuccessMessage("Todo item added successfully!");
          setTimeout(() => props.setSuccessMessage(""), 3000);
        });
    } catch (err) {
      props.setErrorMessage("Failed to add the todo item. Please try again.");
      setTimeout(() => props.setErrorMessage(""), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={props.title}
        onChange={(e) => props.setTitle(e.target.value)}
      />
      {errors.title && <span style={{ color: "red" }}>{errors.title}</span>}

      <textarea
        placeholder="Description"
        value={props.description}
        onChange={(e) => props.setDescription(e.target.value)}
      />
      <button type="submit">{props.selectedID ? "Edit" : "Add"} Todo</button>
    </form>
  );
};

export default TodoForm;
