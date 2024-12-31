const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

router.post("/", async (req, res) => {
  const { title, description } = req.body;
  try {
    let todoObj = {
      title: title,
      description: description,
    };
    const newTodo = new Todo(todoObj);
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: "Failed to create TODO", error: err });
  }
});

router.get("/", async (req, res) => {
  try {
    const { status, search } = req.query;

    let filter = {};
    if (status) {
      if (status === "completed") {
        filter.isCompleted = true;
      } else if (status === "pending") {
        filter.isCompleted = false;
      }
    }

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const todos = await Todo.find(filter);
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: "Error fetching TODOs", error: err });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, isCompleted } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, {
      title,
      description,
      isCompleted,
    });
    if (!updatedTodo) {
      return res.status(404).json({ message: "TODO not found" });
    }
    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: "Failed to update TODO", error: err });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ message: "TODO not found" });
    }
    res.status(200).json({ message: "TODO deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete TODO", error: err });
  }
});

module.exports = router;
