import net from "net";
import readline from "readline";
import { RequestType } from "./requesttype.js";
import { ResponseType } from "./responsetype.js";

if (process.argv.length !== 3) {
  console.error("You must use your user ID as a parameter");
  process.exit(1);
}

const userId = parseInt(process.argv[2]);

const client = net.connect({ port: 60300 }, () => {
  console.log(`Connected to GroupChat on port 60300 as User ${userId}`);
});

client.on("data", (chunk) => {
  const messages = chunk.toString().split("\n").filter((msg) => msg.trim() !== "");
  for (const message of messages) {
    try {
      const response: ResponseType = JSON.parse(message);
      console.log(`\nUser ${response.userId}: ${response.message}`);
    } catch (error) {
      console.error("Error parsing server response:", error);
    }
  }
});

client.on("error", () => {
  console.error("Could not connect to the GroupChat");
  process.exit(1);
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (input) => {
  if (input.trim() !== "") {
    const request: RequestType = { userId, message: input };
    client.write(JSON.stringify(request) + "\n");
  }
});
