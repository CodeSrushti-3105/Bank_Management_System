
const mongoose = require("mongoose");

// Define schema (structure of data)
const recordSchema = new mongoose.Schema({
    accountNumber: { type: String, required: true },
    accountHolder: { type: String, required: true },
    balance: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true }
});

// Export model
module.exports = mongoose.model("Record", recordSchema);

// const mongoose = require("mongoose");

// const recordScheme =  new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true }
// });

// module.exports = mongoose.model("Records", recordScheme);

