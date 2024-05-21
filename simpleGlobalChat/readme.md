# Simple Chat Application

This application leverages **Socket.io** with **Node.js** to create a basic chat platform. **_Please note: This is a demo application and is not suitable for production environments._**

## Features

- Real-time messaging between connected clients
- In-memory message storage
- Simple and intuitive user interface

## Important Notes

- **Non-persistent storage**: Messages are stored in memory and will be lost when the server is restarted. No database is used.
- **Demo purpose only**: This application is intended for demonstration and learning purposes. It lacks the security, scalability, and robustness required for production use.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine
- [npm](https://www.npmjs.com/) (Node package manager)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/simple-chat-app.git
   cd simple-chat-app
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

### Running the Application

1. Start the server:

   ```sh
   npm start
   ```

2. Open your browser and navigate to:

   ```
   http://localhost:3000
   ```

3. Start chatting! Open multiple browser windows or tabs to simulate different users.

### Project Structure

- `server.js`: The main server file that sets up the Node.js server and integrates Socket.io.
- `public/`: Contains the client-side HTML, CSS, and JavaScript files.

### Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

### License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

### Acknowledgments

- [Socket.io](https://socket.io/)
- [Node.js](https://nodejs.org/)

For any questions or suggestions, please open an issue in the GitHub repository.
