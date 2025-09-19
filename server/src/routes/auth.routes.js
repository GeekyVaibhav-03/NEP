import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// In-memory users (replace with DB later)
const users = new Map(); // email -> { email, name, hash }
const admins = new Map(); // email -> { email, name, hash, role }

// Default admin account
const defaultAdminEmail = "admin@timetable.com";
const defaultAdminPassword = "admin123"; // Change this in production!

// Create default admin account
(async () => {
  const adminHash = await bcrypt.hash(defaultAdminPassword, 10);
  admins.set(defaultAdminEmail, {
    email: defaultAdminEmail,
    name: "System Administrator",
    hash: adminHash,
    role: "admin",
  });
})();

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";
const ADMIN_JWT_SECRET =
  process.env.ADMIN_JWT_SECRET || "admin_secret_change_me";
const JWT_EXPIRES = "2h";

function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}

function signAdminToken(payload) {
  return jwt.sign(payload, ADMIN_JWT_SECRET, { expiresIn: JWT_EXPIRES });
}

router.post("/signup", async (req, res) => {
  try {
    const { email, password, name, userType = "student" } = req.body || {};
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });
    if (users.has(email))
      return res.status(409).json({ error: "User already exists" });
    const hash = await bcrypt.hash(password, 10);
    const user = {
      email,
      name: name || email.split("@")[0],
      hash,
      userType: userType || "student",
    };
    users.set(email, user);
    const token = signToken({
      sub: email,
      name: user.name,
      userType: user.userType,
    });
    res.json({
      user: {
        email,
        name: user.name,
        userType: user.userType,
      },
      token,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const user = users.get(email);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.hash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });
    const token = signToken({
      sub: email,
      name: user.name,
      userType: user.userType || "student",
    });
    res.json({
      user: {
        email,
        name: user.name,
        userType: user.userType || "student",
      },
      token,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Admin login route
router.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const admin = admins.get(email);
    if (!admin) {
      return res.status(401).json({ error: "Invalid admin credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, admin.hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid admin credentials" });
    }

    const token = signAdminToken({
      sub: email,
      name: admin.name,
      role: admin.role,
    });

    res.json({
      user: {
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
      token,
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin verification route
router.get("/admin/me", (req, res) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ error: "Missing token" });

    const decoded = jwt.verify(token, ADMIN_JWT_SECRET);
    const admin = admins.get(decoded.sub);
    if (!admin) return res.status(401).json({ error: "Admin not found" });

    res.json({
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });
  } catch (e) {
    res.status(401).json({ error: "Unauthorized admin access" });
  }
});

// Example protected route
router.get("/me", (req, res) => {
  try {
    const header = req.headers.authorization || ""; // Bearer token
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ error: "Missing token" });
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.get(decoded.sub);
    if (!user) return res.status(401).json({ error: "User not found" });
    res.json({
      email: user.email,
      name: user.name,
      userType: user.userType || "student",
    });
  } catch (e) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

export default router;
