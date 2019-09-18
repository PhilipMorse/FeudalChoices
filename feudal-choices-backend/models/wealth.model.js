const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const wealthSchema = new Schema({
    username: { type: String, required: true, unique: true },
    description: { type: String },
    wood: { type: Number, required: true, default: 0 },
    stone: { type: Number, required: true, default: 0 },
    woodcutting: { type: Number, required: true, default: 0 },
    mining: { type: Number, required: true, default: 0 },
    farming: { type: Number, required: true, default: 0 },
    food: { type: Number, required: true, default: 0 },
    armysize: { type: Number, required: true, default: 0 },
    armylevel: { type: Number, required: true, default: 0 },
}, {
    timestamps: true,
});

const Wealth = mongoose.model('Wealth', wealthSchema);

module.exports = Wealth;