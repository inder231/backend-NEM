const router = require("express").Router();
// Bring the userRegister function
const { userRegister, userLogin } = require("../utils/Auth");

// REGISTERATION =================================
// User Registration Route;
router.post("/register-user", async (req, res) => {
  await userRegister(req.body, "user", res);
});

// Customer Registration Route;
router.post("/register-customer", async (req, res) => {
  await userRegister(req.body, "customer", res);
});

// Admin Registration Route;
router.post("/register-admin", async (req, res) => {
  await userRegister(req.body, "admin", res);
});

// SuperAdmin Registration Route;
router.post("/register-superadmin", async (req, res) => {
  await userRegister(req.body, "superadmin", res);
});

// LOGIN =================================================================
// User login Route;
router.post("/login-user", async (req, res) => {
  await userLogin(req.body, "user", res);
});

// Customer login Route;
router.post("/login-customer", async (req, res) => {
  await userLogin(req.body, "customer", res);
});

// Admin login Route;
router.post("/login-admin", async (req, res) => {
  await userLogin(req.body, "admin", res);
});

// SuperAdmin login Route;
router.post("/login-superadmin", async (req, res) => {
  await userLogin(req.body, "superadmin", res);
});

//PROTECTED =================================
// User Registration Route;
router.post("/protected-user", async (req, res) => {});

// Customer Protected Route;
router.post("/protected-customer", async (req, res) => {});

// Admin Protected Route;
router.post("/protected-admin", async (req, res) => {});

// SuperAdmin Protected Route;
router.post("/protected-superadmin", async (req, res) => {});

// PROFILE =================================
router.get("/profile", async (req, res) => {});

// EXPORTS
module.exports = { router };
