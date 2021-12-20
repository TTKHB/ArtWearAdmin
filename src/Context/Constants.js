import axios from "axios";
import baseURL from "../assets/common/baseUrl";

export default axios.create({ baseURL: `${baseURL}/users` });
