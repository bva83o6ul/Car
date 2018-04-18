var mongoose = require("mongoose");
module.exports = mongoose.model("Car",{
    "id":Number,
    "type":String,
    "seat":Number,
    "series":String,
    "color":String,
    "price":Number,
    "km":Number,
    "buydate":Date,
    "engine":String,
    "local":Boolean,
    "pai":Boolean,
    "owner":String,
    "brand":String
})