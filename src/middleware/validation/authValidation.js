import { check, validationResult } from 'express-validator';

const AuthValidation = {
  validateSignup: [
    check('email')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Email is required')
      .isEmail()
      .trim()
      .withMessage('Please input a valid email address'),
    check('username')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Username is required')
      .trim()
      .isLength({ min: 3, max: 15 })
      .withMessage('Username must be between 3 to 15 characters')
      .matches((/^[a-z]{1,}[\s]{0,1}[-']{0,1}[a-z]+$/i))
      .withMessage('Username can only contain letters'),
    check('password')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Password is required')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]/, 'i')
      .withMessage('Password must contain at least one uppercase letter, one lowercase letter and one numeric digit')
      .trim()
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters'),
    (req, res, next) => {
      const errors = validationResult(req);
      const errorMessage = {};
      if (!errors.isEmpty()) {
        errors.array({ onlyFirstError: true }).forEach((error) => {
          errorMessage[error.param] = error.msg;
        });
        return res.status(400).json({
          errors: errorMessage,
        });
      }
      return next();
    },
  ],
  validateSignin: [
    check('email')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Email is required')
      .isEmail()
      .trim()
      .withMessage('Please input a valid email address'),
    check('password')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Password is required'),
    (req, res, next) => {
      const errors = validationResult(req);
      const errorMessage = {};
      if (!errors.isEmpty()) {
        errors.array({ onlyFirstError: true }).forEach((error) => {
          errorMessage[error.param] = error.msg;
        });
        return res.status(400).json({
          errors: errorMessage,
        });
      }
      return next();
    },
  ],
};

export default AuthValidation;
