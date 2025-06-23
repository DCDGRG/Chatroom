

const roomGenerator = require('../util/roomIdGenerator.js');
const moment = require('moment');
const chatRooms = require('./home').chatRooms; // 引入共享的 chatRooms 对象

function getRoom(request, response) {
  const roomName = request.params.roomName;
  if (chatRooms[roomName]) {
    response.render('room', {
      title: 'chatroom',
      roomName: roomName,
      newRoomId: roomGenerator.roomIdGenerator(),
      messages: chatRooms[roomName],    //传递当前房间的所有消息
    });
  } else {
    response.status(404).send('Room not found');
  }
}

function getMessages(req, res) {
  const roomName = req.params.roomName;
  res.json(chatRooms[roomName] || []);
}

function sendMessages(req, res) {
  const roomName = req.params.roomName;
  const message = {
    nickName: req.body.nickName,
    text: req.body.text,
    timestamp: moment().format('h:mm a')
  };
  if (chatRooms[roomName]) {
    chatRooms[roomName].push(message);
    res.status(200).send();
  } else {
    res.status(404).send('Room not found');
  }
}

module.exports = {
  getRoom,
  getMessages,
  sendMessages,
};