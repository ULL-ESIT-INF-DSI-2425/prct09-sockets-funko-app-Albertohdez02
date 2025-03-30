import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { FunkoType } from "../enums/funkotype.js";
import { FunkoGenre } from "../enums/funkogenre.js";
import { Funko } from "../models/funko.js";
import { RequestType } from "../types/requesttype.js";
import { FunkoClient } from "../models/client.js"; 

const client = new FunkoClient("localhost", 60300); 

yargs(hideBin(process.argv))
  .command(
    "add",
    "Adds a Funko to the collection",
    (yargs) => {
      return yargs.options({
        user: { type: "string", demandOption: true },
        id: { type: "number", demandOption: true },
        name: { type: "string", demandOption: true },
        desc: { type: "string", demandOption: true },
        type: { type: "string", demandOption: true },
        genre: { type: "string", demandOption: true },
        franch: { type: "string", demandOption: true },
        number: { type: "number", demandOption: true },
        exc: { type: "boolean", demandOption: true },
        feats: { type: "string", demandOption: false, default: "" },
        value: { type: "number", demandOption: true },
      });
    },
    (args) => {
      const funko: Funko = new Funko(
        args.id,
        args.name,
        args.desc,
        args.type as FunkoType,
        args.genre as FunkoGenre,
        args.franch,
        args.number,
        args.exc,
        args.feats,
        args.value
      );

      const request: RequestType = {
        type: "add",
        username: args.user,
        funkoPop: [funko],
      };

      client.sendRequest(request);
    }
  )
  .command(
    "remove",
    "Removes a Funko from the collection",
    (yargs) => {
      return yargs.options({
        user: { type: "string", demandOption: true },
        id: { type: "number", demandOption: true },
      });
    },
    (args) => {
      const request: RequestType = {
        type: "remove",
        username: args.user,
        funkoId: args.id,
      };

      client.sendRequest(request);
    }
  )
  .command(
    "list",
    "Lists the Funko collection of a user",
    (yargs) => {
      return yargs.options({
        user: { type: "string", demandOption: true },
      });
    },
    (args) => {
      const request: RequestType = {
        type: "list",
        username: args.user,
      };

      client.sendRequest(request);
    }
  )
  .command(
    "show",
    "Shows a singular Funko from a user's collection",
    (yargs) => {
      return yargs.options({
        user: { type: "string", demandOption: true },
        id: { type: "number", demandOption: true },
      });
    },
    (args) => {
      const request: RequestType = {
        type: "show",
        username: args.user,
        funkoId: args.id,
      };

      client.sendRequest(request);
    }
  )
  .command(
    "modify",
    "Modifies a Funko in the collection",
    (yargs) => {
      return yargs.options({
        user: { type: "string", demandOption: true },
        id: { type: "number", demandOption: true },
        name: { type: "string", demandOption: true },
        desc: { type: "string", demandOption: true },
        type: { type: "string", demandOption: true },
        genre: { type: "string", demandOption: true },
        franch: { type: "string", demandOption: true },
        number: { type: "number", demandOption: true },
        exc: { type: "boolean", demandOption: true },
        feats: { type: "string", demandOption: false, default: "" },
        value: { type: "number", demandOption: true },
      });
    },
    (args) => {
      const funko: Funko = new Funko(
        args.id,
        args.name,
        args.desc,
        args.type as FunkoType,
        args.genre as FunkoGenre,
        args.franch,
        args.number,
        args.exc,
        args.feats,
        args.value
      );

      const request: RequestType = {
        type: "modify",
        username: args.user,
        funkoPop: [funko],
      };

      client.sendRequest(request);
    }
  )
  .help()
  .parse();
