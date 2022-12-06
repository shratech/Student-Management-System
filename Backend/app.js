const express = require("express");
const server = express();
const cors = require("cors");

const port = 8000;

require("./db");

// Middleware
server.use(express.json());
server.use(cors());

const userroute = require("./routers/userrouter");
server.use("/userregister", userroute);

server.listen(port, () => {
  console.log("http://localhost:8000");
});
