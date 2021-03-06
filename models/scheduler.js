const mongoose = require("mongoose");

const schedulerSchema = mongoose.Schema({
    create_date: { type: Date, default: Date.now },
    update_date: Date,
    create_by: String,
    name: String,
    tag: String,
    rule: String,
    isActive: Boolean
});

module.exports = mongoose.model('Schedulers', schedulerSchema);