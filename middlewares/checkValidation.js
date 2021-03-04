const { check, validationResult } = require("express-validator");

const registerRules = () => [
  check("Name", "Name is required").notEmpty(),
  check("email", "Email is required").notEmpty(),
  check("LastName", "LastName is required").notEmpty(),
  check("PhoneNumber", "PhoneNumber is required").notEmpty(),
  check("PhoneNumber", "numero telephone doit avoir 8 chiffre").isLength({
    min: 8,
    max: 8,
  }),
  check("gender", "gender is required").notEmpty(),
  check("email", "Please enter a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6, max: 20 }),
];



const loginRules = () => [
  check("email", "Email is required").notEmpty(),
  check("password", "password is required").notEmpty(),
  check("email", "Please enter a valid email").isEmail(),
];

const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(customError(errors.array()));
  } else next();
};

const customError = (errorsArray) =>
  errorsArray.map((err) => ({ msg: err.msg }));

module.exports = validationForms = {
  validator,
  registerRules,
  loginRules,
};