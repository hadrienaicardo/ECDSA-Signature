import axios from "axios";

const server = axios.create({
  baseURL: "http://localhost:3042",
  validateStatus: function(status) {
    return status <= 500;
  }
});

export default server;
