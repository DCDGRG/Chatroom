const moment = require('moment');
const Room = require('../models/Room');
const Message = require('../models/Message');

const VALID_ROOM_NAME = /^[a-zA-Z0-9_-]{2,32}$/;

async function getRoom(req, res) {
  try {
    const roomName = req.params.roomName;
    // Only allow valid room names
    if (!VALID_ROOM_NAME.test(roomName)) {
      return res.status(404).send('Invalid room name');
    }
    let room = await Room.findOne({ name: roomName });
    if (!room) {
      room = await Room.create({ name: roomName });
    }
    // Fetch messages for this room, sorted by timestamp
    const messages = await Message.find({ room: room._id }).sort('timestamp');
    // Format timestamps for display
    const formattedMessages = messages.map(msg => ({
      nickName: msg.nickName,
      text: msg.text,
      timestamp: moment(msg.timestamp).format('h:mm a')
    }));
    res.render('room', {
      title: 'chatroom',
      roomName: roomName,
      messages: formattedMessages
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}

async function getMessages(req, res) {
  try {
    const roomName = req.params.roomName;
    const room = await Room.findOne({ name: roomName });
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    const messages = await Message.find({ room: room._id }).sort('timestamp');
    const formatted = messages.map(msg => ({
      nickName: msg.nickName,
      text: msg.text,
      timestamp: moment(msg.timestamp).format('h:mm a')
    }));
    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function sendMessages(req, res) {
  try {
    const roomName = req.params.roomName;
    const room = await Room.findOne({ name: roomName });
    if (!room) {
      return res.status(404).send('Room not found');
    }
    const { nickName, text } = req.body;
    await Message.create({
      room: room._id,
      nickName,
      text,
      timestamp: moment().toDate()
    });
    res.redirect(`/${roomName}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}

module.exports = {
  getRoom,
  getMessages,
  sendMessages,
};