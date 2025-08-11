const taskModel = require("../models/task.model");

async function getTaskController(req, res) {
  const tasks = await taskModel.find();
  if (tasks.length < 1) {
    return res.status(200).json({
      message: "No task created",
    });
  }
  res.status(200).json({
    message: "Tasks fetched",
    tasks,
  });
}

async function createTaskController(req, res) {
  const { title} = req.body;

  try {
    const task = await taskModel.create({
      title,
      completed: false,
    });
    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    return res.status(400).json({
      message: `Error : ${error.message}`,
    });
  }
}

async function deleteTaskController(req, res) {
  const { id } = req.params;

  try {
    const deletedTask = await taskModel.findOneAndDelete({
      _id: id,
    });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task deleted successfully",
      deletedTask,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Something wrong",
    });
  }
}

async function updateTaskController(req, res) {
  const { id } = req.params;
  const { title, completed } = req.body;
 

  try {
    const task = await taskModel.findOneAndUpdate(
      { _id: id },
      {
        title,
        completed,
      },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong",
    });
  }
}

module.exports = {
  getTaskController,
  createTaskController,
  deleteTaskController,
  updateTaskController,
};
