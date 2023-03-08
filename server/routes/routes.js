const express = require("express");
const userModel = require("../models/user_model");
const app = express();

//POST
app.post("/add_user", async (req, res) => {
  const user = new userModel(req.body);

  try {
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//PUT
app.put("/users/update/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findById({ _id: id });
    if (!user) {
      return res.status(404).send({ message: `User with ID ${id} not found` });
    }

    user.name = req.body.name || user.name;
    user.points = req.body.points || user.points;

    const updatedUser = await user.save();

    res.send(updatedUser);
  } catch (error) {
    console.error(err);
    res.status(500).send({ message: error.message });
  }
});

//GET
app.get("/users", async (req, res) => {
  const users = await userModel.find({});

  try {
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//DELETE
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await userModel.findOneAndDelete({ _id: id });

    if (!deletedUser) {
      return res.status(404).send({ message: `User with ID ${id} not found` });
    }

    res.status(200).send(deletedUser);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = app;
