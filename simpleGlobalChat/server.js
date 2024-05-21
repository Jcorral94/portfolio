import express from "express";
import cors from "cors";
import { createServer } from "http";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import Chat from "./Chat.js";
import "dotenv/config.js";
const PORT = process.env.PORT || 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const server = createServer(app);
const io = new Server(server);

let debug = true;

const userConnected = (socket) => {
  if (debug) {
    console.log("a user connected", socket.id);
  }
  Chat.addUser(socket.id);
  // const history = Chat.getMessages();
  // socket.emit("chat history", history);
};

app.use(cors());
app.use(express.static(join(__dirname, "./public")));

app.get("/", (req, res) => {
  res.sendFile(
    join(dirname(fileURLToPath(import.meta.url)), "./public/index.html")
  );
});

io.on("connection", (socket) => {
  // during inital connection, add user to chat, send history of messages
  userConnected(socket);

  socket.on("chat message", (msg) => {
    Chat.addMessage(msg, socket.id);
    socket.broadcast.emit("chat message", msg);
    if (debug) {
      console.log("message: " + msg, Chat.getMessages());
    }
  });

  socket.on("updated-username", (username) => {
    if (debug) {
      console.log("username updated", username);
    }
    Chat.updateUsername(socket.id, username);
  });
  socket.on("get-chat-history", () => {
    socket.emit("chat history", Chat.getMessages());
  });

  socket.on("disconnect", () => {
    if (debug) {
      console.log("user disconnected");
    }
    Chat.removeUser(socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
