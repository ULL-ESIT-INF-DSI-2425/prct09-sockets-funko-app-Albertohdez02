import * as net from "net";
import { FunkoCollection } from "../models/funkocollection.js";
import { RequestType } from "../types/requesttype.js";
import { ResponseType } from "../types/responsetype.js";

/**
 * Class that creates a Server that host a user's FunkoCollection
 *
 * Class FunkoServer
 */
export class FunkoServer {
  private server: net.Server;
  private collection: FunkoCollection;

  /**
   * Constructs a socket that will manage a FunkoCollection
   * @param port - number of the port that will hold the connection (number)
   */
  constructor(private port: number) {
    this.server = net.createServer({ allowHalfOpen: true }, (socket) => {
      console.log("Client connected.");

      let requestData = "";

      socket.on("data", (chunk) => {
        requestData += chunk.toString();

        // Si la petición termina en '\n', procesamos la petición
        if (requestData.endsWith("\n")) {
          socket.emit("request", requestData.trim()); // emitimos un evento propio "request"
          requestData = ""; // reiniciamos el buffer
        }
      });

      socket.on("request", async (data: string) => {
        try {
          const request: RequestType = JSON.parse(data);
          console.log("Petition received:", request);

          this.collection = new FunkoCollection(request.username);
          let response: ResponseType = { type: request.type, success: false };

          switch (request.type) {
            case "add": {
              if (request.funkoPop) {
                this.collection.addFunko(request.funkoPop[0]);
                response.success = true;
              }
              break;
            }
            case "modify": {
              if (request.funkoPop) {
                this.collection.modifyFunko(request.funkoPop[0]);
                response.success = true;
              }
              break;
            }
            case "remove": {
              if (request.funkoId !== undefined) {
                this.collection.removeFunko(request.funkoId);
                response.success = true;
              }
              break;
            }
            case "show": {
              if (request.funkoId !== undefined) {
                const funko = await this.collection.showFunko(request.funkoId);
                if (funko) {
                  response.success = true;
                  response.funkoPops = [funko];
                }
              }
              break;
            }
            case "list": {
              const funkos = await this.collection.listFunkos();
              response.success = true;
              response.funkoPops = funkos;
              break;
            }
            default: {
              console.log("Invalid request.");
            }
          }

          socket.write(JSON.stringify(response) + "\n");
        } catch (error) {
          console.error("Error processing the petition:", error);
          socket.write(
            JSON.stringify({ type: "error", success: false }) + "\n",
          );
        } finally {
          socket.end();
          console.log("Client disconnected.");
        }
      });

      socket.on("error", (err) => {
        console.error("Conection error:", err);
      });
    });

    this.server.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}
