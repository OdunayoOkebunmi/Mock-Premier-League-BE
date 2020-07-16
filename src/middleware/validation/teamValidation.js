import { check, validationResult } from 'express-validator';

const TeamValidation = {
  validateTeam: [
    check('name')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Team name is required')
      .trim()
      .isLength({ min: 3, max: 15 })
      .withMessage('First name must be between 3 to 15 characters')
      .matches((/^[a-z]{1,}[\s]{0,1}[-']{0,1}[a-z]+$/i))
      .withMessage('First name can only contain letters'),
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

export default TeamValidation;
