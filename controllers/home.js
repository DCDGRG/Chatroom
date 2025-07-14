const Room = require('../models/Room');

async function getHome(req, res) {
  try {
    const rooms = await Room.find({});
    res.render('home', { title: 'home', chatRooms: rooms.map(r => r.name) });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}

async function createRoom(req, res) {
  try {
    let roomName = req.body.roomName || generateRandomID();
    roomName = roomName.trim();
    if (!roomName) {
      return res.redirect('/');
    }
    let room = await Room.findOne({ name: roomName });
    if (!room) {
      await Room.create({ name: roomName });
    }
    res.redirect(`/${roomName}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}

function generateRandomID() {
  return Math.random().toString(36).substring(2, 7).toUpperCase();
}

module.exports = {
  getHome,
  createRoom
};
