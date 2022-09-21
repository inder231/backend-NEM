const { UserModel } = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


// REGISTERATION =================================================================================================
/**
 * @DESC To register a new user(ADMIN, SUPERADMIN,USER,CUSTOMUSER)
 */
const userRegister = async (userDets, role, res) => {
    try {
        // Validate the user
        let usernameTaken = await validateUsername(userDets.username);
        let emailTaken = await validateEmail(userDets.email);
        // Validate Username
        if (usernameTaken === true) {
            return res
        .status(400)
        .send({ message: "Username Already Taken", success: false });
    }
    // Validate Email
    if (emailTaken === true) {
        return res
        .status(400)
        .send({ message: "Email Already Taken", success: false });
    }
    // Get the hashed password
    const hashed = await bcrypt.hash(userDets.password, 8);
    // New User
    const new_user = await new UserModel({
        ...userDets,
        role,
        password: hashed,
    });
    // Save the new user
    await new_user.save();
    return res.status(201).send({ success: true, message: "New User Saved" });
} catch (error) {
    return res.status(500).send({
        message: "Error registering user",
        success: false,
        error: error,
    });
}
};

// VALIDATORS =============================================================================================================================
const validateUsername = async (username) => {
    // Validate username
    let user = await UserModel.findOne({ username });
  return user ? true : false;
};
const validateEmail = async (email) => {
  //   Validate Email
  let user = await UserModel.findOne({ email });
  return user ? true : false;
};

// LOGIN ======================================================================================================================================
/**
 * @DESC To Login a user(ADMIN, SUPERADMIN,USER,CUSTOMUSER)
 */
const userLogin = async (userCreds, role, res) => {
  let { username, email, password } = userCreds;
  // First Check if the username is in the database;
  const user = await UserModel.findOne({ username });
  if (!user) {
    return res.status(404).send({
      message: "Username not found. Invalid login credentials",
      success: false,
    });
  }
  // we will check the role
  if (user.role !== "user") {
    return res.status(403).send({
      message: "Please make sure you login from right portal",
      success: false,
    });
  }
  // That means the user is existing and we can try to login
  // Check for password
  if (!password || !email) {
    return res
      .status(403)
      .send({
        message: "Username and Password are required for this user",
        success: false,
      });
  }
  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    // assign token
    const token = jwt.sign(
      { user_id: user._id, role: user.role, username, email },
      process.env.SECRET_KEY,
      { expiresIn: "7 days" }
    );
    let result = {
      username: user.username,
      role: user.role,
      email: user.email,
      token: `Bearer ${token}`,
      expiresIn: 168,
    };
    return res
      .status(200)
      .send({ ...result, message: "Login successful", success: true });
  } else {
    return res
      .status(403)
      .send({ message: "Password is incorrect", success: false });
  }
};

// Export =================================================================
module.exports = { userRegister, userLogin };
