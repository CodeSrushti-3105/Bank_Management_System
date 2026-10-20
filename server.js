
// Import required packages
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const Record = require("./models/Record");

// Middleware
app.use(express.json());
app.use(express.static("public"));

// CREATE - Add new record
app.post("/api/records", async (req, res) => {
    const record = await Record.create(req.body);
    res.json(record);
});

// READ - Get all records
app.get("/api/records", async (req, res) => {
    const records = await Record.find();
    res.json(records);
});

// UPDATE - Edit record by ID
app.put("/api/records/:id", async (req, res) => {
    const record = await Record.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(record);
});

// DELETE - Remove record by ID
app.delete("/api/records/:id", async (req, res) => {
    await Record.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});


// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(5000, () => console.log("Server running on port 5000"));
    });
