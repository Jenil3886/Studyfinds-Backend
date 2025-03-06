const { z } = require("zod");
const { ERROR_MSG } = require("../utils/messages.js");

const registerUser = z.object({
  fullname: z.string().min(6, ERROR_MSG.INVALID_FULLNAME),
  username: z.string().min(3, ERROR_MSG.INVALID_USERNAME),
  email: z.string().email(ERROR_MSG.INVALID_EMAIL),
  password: z.string().min(8, ERROR_MSG.INVALID_PASSWORD),
});

const loginUser = z.object({
  email: z.string().email(ERROR_MSG.INVALID_EMAIL),
  password: z.string().min(8, ERROR_MSG.INVALID_PASSWORD),
});

module.exports = {
  registerUser,
  loginUser,
};
