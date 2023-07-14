const express = require("express");
const userModel = require("../model/user.model");
const userRouter = express.Router();

// Add route -> add the user data to the mongoDB Atlas
userRouter.post("/", async (req, res) => {
  try {
    const user = new userModel(req.body);
    await user.save();
    res.send("user added successfully");
  } catch (error) {
    console.log(error);
    res.send("error", error.message);
  }
});


// get route -> get all the user data
userRouter.get("/", async (req, res) => {
  try {
    let user = await userModel.find();
    res.send(user);
  } catch (error) {
    res.send("error", error.message);
  }
});

// update route -> update the details of particular user
userRouter.patch("/update/:id", async (req, res) => {
  const ID = req.params.id;
  const payload = req.body;
  try {
    await userModel.findByIdAndUpdate({ _id: ID }, payload);
    res.send({ msg: `User with ID: ${ID} has been updated successfully` });
  } catch (err) {
    res.send({ msg: "somthing went wrong! cannot update", error: err.message });
  }
});

// delete route -> delete the particular user from the data base
userRouter.delete("/delete/:id", async (req, res) => {
  const ID = req.params.id;
  try { 
    await userModel.findByIdAndDelete({ _id: ID });
    res.send({ msg: `User with ID: ${ID} has been deleted successfully` });
  } catch (err) {
    res.send({ msg: "somthing went wrong! cannot delete", error: err.message });
  }
});

// search route -> search the user by the name
userRouter.get("/search", async (req, res) => {
  const { q } = req.query;
  try {
    const products = await userModel.find({
      name: { $regex: new RegExp(q, "i") },
    });
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

module.exports = userRouter;
