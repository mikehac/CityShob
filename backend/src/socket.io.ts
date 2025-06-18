import { Server } from "socket.io";

const socketIoInit = (httpServer: any) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:4200",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("task:create", (task) => {
      io.emit("task:created", task);
    });

    socket.on("task:update", (task) => {
      io.emit("task:updated", task);
    });

    socket.on("task:delete", (taskId) => {
      io.emit("task:deleted", taskId);
    });

    socket.on("task:disable-editing", (taskId) => {
      io.emit("task:editing-disabled", taskId);
    });

    socket.on("task:enable-editing", (taskId) => {
      io.emit("task:editing-enabled", taskId);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

export default socketIoInit;
