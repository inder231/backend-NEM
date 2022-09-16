const UserModel = require("../models/user");
signup = async (req, res) => {
  try {
    const new_user = new UserModel(req.body);
    await new_user.save();
    res.send("New user Created!");
  } catch (error) {
    res.send("Something went wrong!", error);
  }
};
module.exports = { signup };
