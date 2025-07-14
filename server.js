// import dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');

// import handlers
const homeHandler = require('./controllers/home.js');
const roomHandler = require('./controllers/room.js');

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB using environment variable
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error('❌ MONGO_URI not defined');
  process.exit(1);
}
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });


// If you choose not to use handlebars as template engine, you can safely delete the following part and use your own way to render content
// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// set up stylesheets route

// TODO: Add server side code

// Create controller handlers to handle requests at each endpoint
app.get('/', homeHandler.getHome);
app.post('/createRoom', homeHandler.createRoom);

app.get('/:roomName', roomHandler.getRoom);
app.get('/:roomName/messages', roomHandler.getMessages);
app.post('/:roomName/messages', roomHandler.sendMessages);

// NOTE: This is the sample server.js code we provided, feel free to change the structures

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
