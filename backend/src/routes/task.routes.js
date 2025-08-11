const { getTaskController, createTaskController, deleteTaskController, updateTaskController } = require("../controllers/task.controller");

const router = require("express").Router();

//Create Task
router.post("/",createTaskController)


//read Tasks
router.get("/",getTaskController)

//delete task
router.delete("/:id",deleteTaskController)

//update task
router.patch("/:id",updateTaskController)


module.exports = router