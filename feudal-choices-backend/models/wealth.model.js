const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const wealthSchema = new Schema({
    username: { type: String, required: true, unique: true },
    description: { type: String },
    wood: { type: Number, required: true, default: 0 },
    stone: { type: Number, required: true, default: 0 },
}, {
    timestamps: true,
});

const Wealth = mongoose.model('Wealth', wealthSchema);

module.exports = Wealth;