import express from 'express';
import UsersModel from './user-model.mjs';
import restricted from '../auth/restricted-middleware.mjs';

const router = express.Router()

router.get('/', restricted, async (req, res) => {
  try {
    const users = await UsersModel.findUser()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ errorMessage: 'Could not find user' })
  }
})

router.get('/:id', restricted, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UsersModel.findById(id);
    !user
      ? res.status(404).json({ message: 'user not found' })
      : res.status(200).json(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router