const { Types } = require("mongoose");

const objectId = (id) => {
  return Types.ObjectId.createFromHexString(id);
};

module.exports = { objectId };
