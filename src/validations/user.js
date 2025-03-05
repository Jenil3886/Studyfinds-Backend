const { z } = require("zod");

const registerUser = z.object({
  fullname: z.string().min(6, "Full name must be at least 6 characters long"),
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

module.exports = {
  registerUser,
};
