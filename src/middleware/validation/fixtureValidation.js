import { check, validationResult } from 'express-validator';

const FixtureValidation = {
  validateFixture: [
    check('home')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Team home is required')
      .trim()
      .isLength({ min: 3, max: 20 })
      .withMessage('Name must be between 3 to 20 characters')
      .matches((/^[a-z]{1,}[\s]{0,1}[-']{0,1}[a-z]+$/i))
      .withMessage('Name can only contain letters'),
    check('away')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Team away is required')
      .trim()
      .isLength({ min: 3, max: 20 })
      .withMessage('Name must be between 3 to 20 characters')
      .matches((/^[a-z]{1,}[\s]{0,1}[-']{0,1}[a-z]+$/i))
      .withMessage('Name can only contain letters'),
    check('location')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Location is required')
      .trim()
      .isLength({ min: 3, max: 50 })
      .withMessage('Location must be between 3 to 50 characters'),
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

export default FixtureValidation;
