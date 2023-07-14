const express = require("express");
const { connection } = require("./config/db");
const userRouter = require("./route/user.route");
require("dotenv").config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/user", userRouter);





app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connected to DB ");
  } catch (error) {
    console.log("Cannot Connected to DB");
    console.log(error);
  }
  console.log(`server is running at port no. 8080`);
});

