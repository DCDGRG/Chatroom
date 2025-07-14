const mongoose = require('mongoose');
const { Schema } = mongoose;

const RoomSchema = new Schema({
  name: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Room', RoomSchema);