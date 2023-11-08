import express from 'express';
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from '../controllers/userController.js';

const router = express.Router();

//Update
router.put('/:id', updateUser);
//Delete
router.delete('/:id', deleteUser);
//Get
router.get('/:id', getUser);
//Get All
router.get('/', getAllUsers);

export default router;
