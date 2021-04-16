const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AdminUser = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    register_date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Admin = mongoose.model("admin", AdminUser);
