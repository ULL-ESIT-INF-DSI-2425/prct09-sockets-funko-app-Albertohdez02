import net from "net";
import { RequestType } from "./requesttype.js";
import { ResponseType } from "./responsetype.js";

let sockets: { id: number; socket: net.Socket }[] = [];
let clientIdCounter = 1;

const server = net.createServer((socket) => {
  const clientId = clientIdCounter++;
  console.log(`Client ${clientId} connected.`);
  sockets.push({ id: clientId, socket });

  let requestData = "";

  socket.on("data", (chunk) => {
    requestData += chunk.toString();

    let endOf: number;
    while ((endOf = requestData.indexOf("\n")) !== -1) {
      let message = requestData.substring(0, endOf).trim();
      requestData = requestData.substring(endOf + 1); 
      try {
        const request: RequestType = JSON.parse(message);
        console.log(`Message from Client ${request.userId}: ${request.message}`);
        const response: ResponseType = {
          userId: request.userId,
          message: request.message,
        };
        sockets.forEach(({ id, socket }) => {
          if (id !== clientId) {
            socket.write(JSON.stringify(response) + "\n");
          }
        });
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  });

  socket.on("error", (err) => {
    console.error(`Connection error with Client ${clientId}:`, err);
  });

  socket.on("close", () => {
    console.log(`Client disconnected.`);

  });
});

server.listen(60300, () => {
  console.log("Chat server listening on port 60300");
});
