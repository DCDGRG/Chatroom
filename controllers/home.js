
const chatRooms = {}; // 定义共享的 chatRooms 对象

function getHome(request, response) {
  response.render('home', { title: 'home', chatRooms: Object.keys(chatRooms) });
}

function createRoom(req, res) {
  const roomName = req.body.roomName || generateRandomID();
  if (!chatRooms[roomName]) {
    chatRooms[roomName] = []; // 初始化房间的消息数组
  }
  res.redirect(`/${roomName}`);
}

function generateRandomID() {
  return Math.random().toString(36).substring(2, 7).toUpperCase();
}

module.exports = {
  getHome,
  createRoom,
  chatRooms, // 导出 chatRooms 对象
};
