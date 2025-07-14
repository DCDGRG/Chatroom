const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
  room:     { type: Schema.Types.ObjectId, ref: 'Room', required: true },
  nickName: { type: String, required: true },
  text:     { type: String, required: true },
  timestamp:{ type: Date,   default: Date.now }
});

module.exports = mongoose.model('Message', MessageSchema);