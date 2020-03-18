const mongoose = require("mongoose");

const confessionSchema = mongoose.Schema({
    create_date: { type: Date, default: Date.now },
    update_date: { type: Date },
    updated_by: String,
    archived :{ type: Boolean, default: false },
    serial: Number,
    message: String,
    comment: String
});

module.exports = mongoose.model('Confession', confessionSchema);