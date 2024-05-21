document.addEventListener("DOMContentLoaded", () => {
  const socket = io();

  document
    .getElementById("username-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const usernameInput = document
        .getElementById("username-input")
        .value.trim();
      if (usernameInput) {
        const createUsernameSection = document.getElementById("createUsername");
        const chatSection = document.getElementById("chat");

        createUsernameSection.style.opacity = "0";
        createUsernameSection.style.pointerEvents = "none";

        setTimeout(() => {
          createUsernameSection.style.display = "none";
          chatSection.style.opacity = "1";
          chatSection.style.pointerEvents = "all";

          const client = new Client(usernameInput, socket);

          client.emit("updated-username", usernameInput);
          client.emit("get-chat-history");

          document
            .getElementById("chat-form")
            .addEventListener("submit", (event) => {
              event.preventDefault();
              const message = document.getElementById("chat-input").value;
              if (message.trim() !== "") {
                client.sendMessage(message);
                document.getElementById("chat-input").value = "";
              }
            });
        }, 500);
      }
    });

  class Client {
    constructor(username, socket) {
      this.socket = socket;
      this.socket.on("connect", () => {
        console.log("connected to server");
        this.username = `${username}-${socket.id}`;
        this.socket.emit("updated-username", this.username);
        console.log(this.username, this);
      });
      this.socket.on("chat history", (messages) => {
        console.log(messages);
        messages.forEach((message) =>
          this.addMessageToChat(message.content, "other")
        );
      });
      this.socket.on("chat message", (message) => {
        this.addMessageToChat(message, "other");
      });
    }

    emit(event, data) {
      this.socket.emit(event, data);
    }
    sendMessage(message) {
      this.socket.emit("chat message", message);
      this.addMessageToChat(message, "self");
    }

    addMessageToChat(message, type) {
      const chatMessages = document.getElementById("chat-messages");
      const messageElement = document.createElement("p");
      messageElement.classList.add("chat-message", type);
      messageElement.textContent = message;
      chatMessages.appendChild(messageElement);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }
});
