import axios from "axios";

const instance = axios.create({
    baseURL : "https://task-manager-api-be2v.onrender.com/api/tasks"

})

export default  instance