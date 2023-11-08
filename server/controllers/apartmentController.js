import Apartment from '../models/ApartmentModel.js';
import createError from '../utils/error.js';
import User from '../models/UserModel.js';

// Create Apartment
export const createApartment = async (req, res, next) => {
  try {
    // Retrieve the user's email from the JWT token or your authentication system
    const userEmail = req.user.email;

    // Find the user based on their email
    const user = await User.findOne({ email: userEmail });

    // If the user does not exist, return an error response
    if (!user) {
      return res.status(404).json({ status: 'error', error: 'User not found' });
    }

    // Extract the user's ID
    const userId = user._id;

    // Create a new apartment with the user's ID and request data
    const newApartment = new Apartment({
      user: userId, // Assign the user's ID
      type: req.body.type,
      title: req.body.title,
      size: req.body.size,
      bedrooms: req.body.bedrooms,
      address: req.body.address,
      bathrooms: req.body.bathrooms,
      furnished: req.body.furnished,
      parking: req.body.parking,
      distance: req.body.distance,
      rent: req.body.rent,
      imageUrls: req.body.imageUrl,
    });

    // Save the apartment to the database
    const savedApartment = await newApartment.save();

    // Check if the apartment was successfully saved
    if (!savedApartment) {
      throw createError(500, 'Failed to save apartment');
    }

    // Return a success response with the saved apartment data
    res.status(201).json(savedApartment);
  } catch (error) {
    // Handle errors and pass them to the error handling middleware
    console.error('Error creating apartment:', error);
    next(error);
  }
};

// Update Apartment
export const updateApartment = async (req, res, next) => {
  try {
    const updatedApartment = await Apartment.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true },
    );
    res.status(200).send(updatedApartment);
  } catch (error) {
    next(error);
  }
};

// Delete Apartment
export const deleteApartment = async (req, res, next) => {
  try {
    await Apartment.findByIdAndDelete(req.params.id);
    res.status(200).send('Apartment Has Been Deleted!');
  } catch (error) {
    next(error);
  }
};

// Get Single Apartment
export const getApartment = async (req, res, next) => {
  try {
    const apartment = await Apartment.findById(req.params.id);
    res.status(200).send(apartment);
  } catch (error) {
    next(error);
  }
};

// Updated server-side code
// Get Apartments for Logged-In User
export const getAllApartments = async (req, res) => {
  try {
    // Retrieve the user's email from the JWT token or your authentication system
    const userEmail = req.user.email;

    // Find the user based on their email
    const user = await User.findOne({ email: userEmail });

    // If the user does not exist, return an error response
    if (!user) {
      return res.status(404).json({ status: 'error', error: 'User not found' });
    }

    // Extract the user's ID
    const userId = user._id;

    console.log(userId);
    // Find apartments belonging to the logged-in user
    const userApartments = await Apartment.find({ user: userId });
    res.status(200).json(userApartments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user apartments' });
  }
};

// Get All Apartments
// export const getAllApartments = async (req, res, next) => {
//   try {
//     const allApartments = await Apartment.find();
//     res.status(200).send(allApartments);
//   } catch (error) {
//     next(error);
//   }
// };

// Get All Apartments Uploaded by Logged-In User
export const getAllApartmentsByUser = async (req, res) => {
  try {
    const userEmail = req.user.email;

    // Find the user based on their email
    const user = await User.findOne({ email: userEmail });
    const userId = user._id; // Assuming you're using user ID in your authentication
    const userApartments = await Apartment.find({ user: userId });
    res.status(200).json(userApartments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user apartments' });
  }
};
