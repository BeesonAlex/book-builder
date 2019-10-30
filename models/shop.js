const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopSchema = new Schema({
    shopName: String,
    shopAccessToken: String,
    isActive: { type: Boolean, default: false },
})

const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;