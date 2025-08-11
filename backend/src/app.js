const express = require("express");
const taskRouter = require("./routes/task.routes");
const cors = require("cors")

const app = express()

app.use(express.json());
app.use(cors())

app.use("/api/tasks",taskRouter)

app.get("/",(req,res)=>{
    res.send("Welcome to Task manager api")
})

module.exports = app;