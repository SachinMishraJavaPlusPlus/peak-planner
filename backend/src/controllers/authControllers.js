import User from '../models/User.js';
import ErrorResponse from '../utils/errorResponse.js';

// Create token and send response helper function
const sendTokenResponse = (user, statusCode, res) => {
  try {
    // Create token
    const token = user.getSignedJwtToken();
    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
      options.secure = true;
    }

    res
      .status(statusCode)
      .cookie('token', token, options)
      .json({
        success: true,
        token
      });
  } catch (error) {
    throw new ErrorResponse('Token generation failed', 500);
  }
};

// Register user
export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return next(new ErrorResponse('Please provide all required fields', 400));
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password
    });

    sendTokenResponse(user, 201, res);
  } catch (error) {
    // Handle specific mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return next(new ErrorResponse(messages.join(', '), 400));
    }

    // Handle duplicate key error (e.g., duplicate email)
    if (error.code === 11000) {
      return next(new ErrorResponse('User already exists', 400));
    }

    // Generic server error
    next(new ErrorResponse('Server error during registration', 500));
  }
};

// Login user
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      return next(new ErrorResponse('Please provide an email and password', 400));
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(new ErrorResponse('Login failed', 500));
  }
};

// Get current logged in user
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(new ErrorResponse('User not found', 404));
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(new ErrorResponse('Unable to retrieve user information', 500));
  }
};

// Log user out / clear cookie
export const logout = async (req, res, next) => {
  try {
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(new ErrorResponse('Logout failed', 500));
  }
};

export default {
  register,
  login,
  getMe,
  logout
};