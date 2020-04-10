const mongoose = require("mongoose");

const confessionSchema = mongoose.Schema({
    create_date: { type: Date, default: Date.now },
    update_date: { type: Date },
    updated_by: String,
    message: String,
    comment: String,
    tags: [String],
    serial: Number,
    isArchived :{ type: Boolean, default: false }
});

module.exports = mongoose.model('Confession', confessionSchema);