const express = require("express");
const app = express();
const server = require('http').Server(app);
const io = require("socket.io")(server);
const Port = 3000;
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use((req, res) => {
//     res.status(400).json({
//       error: 400,
//       message: "Error: Page not found"
//     });
// });

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get("/admin", (req, res) => {
  res.sendFile(__dirname + '/admin.html');
});

io.on('connection', (socket) => {
    socket.emit('welcome', { data: 'welcome' });
    socket.on('new', (data) => {
        console.log('About to upload qoute');
        io.emit('next', {data: data});
        console.log('done');
    });
});



server.listen(Port, () => {
  console.log(`Server listening at ${Port}`);
});
