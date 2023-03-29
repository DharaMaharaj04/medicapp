const mongoose = require('mongoose');
const autoIncrement = require("mongoose-auto-increment");


const inventorySchema = new mongoose.Schema({
  
  item: {type: String},
  category: {type: String},
  brands: {type: String},
  vendor: {type: String},
  quantity: {type: String},
  currentstock: {type: String},
  shelf: {type: String}
}, {
});

autoIncrement.initialize(mongoose.connection);
inventorySchema.plugin(autoIncrement.plugin, {
  model: "Inventory", // collection or table name in which you want to apply auto increment
  field: "_id", // field of model which you want to auto increment
  startAt: 101, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});

module.exports = mongoose.model("Inventory", inventorySchema);