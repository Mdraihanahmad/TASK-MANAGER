import axios from "axios";

const instance = axios.create({
    baseURL : "https://task-manager-ds0k.onrender.com/api/tasks"

})

export default  instance