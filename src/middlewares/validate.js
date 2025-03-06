const validate = (schema) => (req, res, next) => {
  const { success, error } = schema.safeParse(req.body);

  console.log(success, req.body)

  if (!success) {
    return res.status(400).json({ message: error.issues[0].message });
  }

  next();
};

module.exports = validate;
