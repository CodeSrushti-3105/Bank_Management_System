// ========================================
// SETUP - Import packages
// ========================================
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const Record = require("./models/Record");
const User = require("./models/User");

const SECRET = "mysecretkey123";

// ========================================
// MIDDLEWARE - Handle JSON and static files
// ========================================
app.use(express.json());
app.use(express.static("public"));

// ========================================
// AUTH - Register new user
// ========================================
app.post("/api/register", async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword });
    res.json({ message: "User registered" });
});

// ========================================
// AUTH - Login user
// ========================================
app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "User not found" });
    
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ message: "Wrong password" });
    
    const token = jwt.sign({ id: user._id }, SECRET);
    res.json({ token, message: "Login successful" });
});

// ========================================
// MIDDLEWARE - Verify token (protect routes)
// ========================================
function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "No token" });
    
    try {
        const decoded = jwt.verify(token, SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
}

// ========================================
// CRUD - Create record
// ========================================
app.post("/api/records", verifyToken, async (req, res) => {
    const record = await Record.create({ ...req.body, userId: req.userId });
    res.json(record);
});

// ========================================
// CRUD - Read all records (user's own only)
// ========================================
app.get("/api/records", verifyToken, async (req, res) => {
    const records = await Record.find({ userId: req.userId });
    res.json(records);
});

// ========================================
// CRUD - Update record
// ========================================
app.put("/api/records/:id", verifyToken, async (req, res) => {
    const record = await Record.findOneAndUpdate(
        { _id: req.params.id, userId: req.userId },
        req.body,
        { new: true }
    );
    res.json(record);
});

// ========================================
// CRUD - Delete record
// ========================================
app.delete("/api/records/:id", verifyToken, async (req, res) => {
    await Record.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ message: "Deleted" });
});

// ========================================
// START SERVER - Connect DB and listen
// ========================================
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(5000, () => console.log("Server running on port 5000"));
    });
