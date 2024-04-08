import express from "express";
import { Server as SocketIOServer } from "socket.io";
import http from "http";
import cors from "cors";
import fs from "fs";
import os from "os";
import path from "path";

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("file_exists_request", (data: string) => {
    const p: string = path.resolve(os.homedir(), data);
    console.log(p, "| exists:", fs.existsSync(p));
    socket.emit("file_exists_response", fs.existsSync(p));
  });
});

server.listen(3001, () => {
  console.log("listening on *:3001");
});
