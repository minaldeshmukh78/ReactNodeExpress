import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import "../App.css";

const API_URL = process.env.REACT_APP_API_URL;
const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [selectedID, setSelectedID] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [addUpdateTodo, setAddUpdateTodo] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchTodos();
  }, [status, search]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/todos`, {
        params: {
          status,
          search,
        },
      });
      setTodos(response.data);
    } catch (error) {
      console.error("Error in fetching records", error);
    }
  };

  const handleEditDetails = () => {
    try {
      axios
        .put(`${API_URL}/todos/${selectedID}`, {
          title: title,
          description: description,
        })
        .then((response) => {
          setTodos((prevTodos) =>
            prevTodos.map((t) => (t._id === selectedID ? response.data : t))
          );
          setTitle("");
          setDescription("");
          setSelectedID("");
          setAddUpdateTodo(false);
          setSuccessMessage("Todo item updated successfully!");
          setTimeout(() => setSuccessMessage(""), 3000);
        });
    } catch (err) {
      setErrorMessage("Failed to update the todo item. Please try again.");
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  const handleEdit = (todo) => {
    setTitle(todo.title);
    setDescription(todo.description);
    setSelectedID(todo._id);
    setAddUpdateTodo(true);
  };

  return (
    <div class="container">
      <h1>Todo List</h1>
    
      {addUpdateTodo && (
        <TodoForm
          setTodos={setTodos}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          selectedID={selectedID}
          handleEditDetails={handleEditDetails}
          setAddUpdateTodo={setAddUpdateTodo}
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessage}
          API_URL={API_URL}
        />
      )}
      <div class="search">
        <input
          type="text"
          placeholder="Search todos"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setStatus(e.target.value)}>
          <option value="all">Show All</option>
          <option value="completed">Show Completed</option>
          <option value="pending">Show Pending</option>
        </select>
        <button onClick={() => setAddUpdateTodo(true)}>Add New</button>
      </div>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <TodoItem
        todos={todos}
        setTodos={setTodos}
        handleEdit={handleEdit}
        setSuccessMessage={setSuccessMessage}
        setErrorMessage={setErrorMessage}
        API_URL={API_URL}
      />
    </div>
  );
};

export default TodoList;
