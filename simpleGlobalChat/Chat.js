import Message from "./Message.js";
import User from "./User.js";

const messages = [];
const users = [];

export default class Chat {
  static addUser(name, socketId) {
    const user = new User(name, socketId);
    users.push(user);
    return user;
  }

  static getUsers() {
    return users;
  }

  static addMessage(content, userId) {
    const message = new Message(content, userId);
    messages.push(message);

    if (messages.length > 100) {
      messages.shift();
    }

    return message;
  }

  static getMessages() {
    return messages;
  }
  static removeUser(socketId) {
    const index = users.findIndex((user) => user.id === socketId);
    if (index !== -1) {
      return users.splice(index, 1)[0];
    }
  }
  static updateUsername(socketId, name) {
    const user = users.find((user) => user.id === socketId);
    if (user) {
      user.updateName(name);

    }
  }
}