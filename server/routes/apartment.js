import express from 'express';
import {
  createApartment,
  deleteApartment,
  getAllApartments,
  getAllApartmentsByUser,
  getApartment,
  updateApartment,
} from '../controllers/apartmentController.js';
import authenticateToken from '../middlewares/authenticateToken.js';

const router = express.Router();

//Create
router.post('/', authenticateToken, createApartment);
//Update
router.put('/:id', updateApartment);
//Delete
router.delete('/:id', deleteApartment);
//Get
router.get('/:id', getApartment);
//Get All
router.get('/', authenticateToken, getAllApartments);
router.get('/all', authenticateToken, getAllApartmentsByUser);

export default router;
