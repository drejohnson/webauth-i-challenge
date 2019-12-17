import express from 'express';
import bcrypt from 'bcryptjs';

import UserModel from '../users/user-model.mjs'

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // check if user already exists
    // const userExist = await UserModel.findBy(username);
    // if (userExist)
    //   return res.status(400).json({ message: "User is already registered" });

    // hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log(req.body);
    console.log(hashedPassword);

    const newUser = await UserModel.add({
      username,
      password: hashedPassword
    });

    console.log(newUser);
    // res.send({
    //   id: newUser.id,
    //   username: newUser.username,
    // });
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
});

// Login
router.post("/login", async (req, res) => {

  const { username, password } = req.body;

  try {
    // check if user exists
    const user = await UserModel
      .findBy({ username })
      .first();
    if (!user) return res.status(400).json({ message: "User doesn't exist" });

    // check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({ message: `Welcome ${user.username}!` });
  } catch (error) {
    res.status(500).send({ error: 'Error with login' });
  }
});

export default router;