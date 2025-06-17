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
      console.log("Task created:", task);
      socket.broadcast.emit("task:created", task);
    });

    socket.on("task:update", (task) => {
      socket.broadcast.emit("task:updated", task);
    });

    socket.on("task:delete", (taskId) => {
      socket.broadcast.emit("task:deleted", taskId);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

export default socketIoInit;
