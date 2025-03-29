import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { FunkoType } from "../enums/funkotype.js";
import { FunkoGenre } from "../enums/funkogenre.js";
import { Funko} from "../models/funko.js";
import { FunkoCollection } from "../models/funkocollection.js";


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
      const funko = new Funko(
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
      const collection = new FunkoCollection(args.user);
      collection.addFunko(funko);
    }
  )
  .command(
    "remove",
    "Removes a Funko to the collection",
    (yargs) => {
      return yargs.options({
        user: { type: "string", demandOption: true },
        id: { type: "number", demandOption: true },
      });
    },
    (args) => {
      const collection = new FunkoCollection(args.user);
      collection.removeFunko(args.id);
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
      const collection = new FunkoCollection(args.user);
      collection.listFunkos();
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
      const collection = new FunkoCollection(args.user);
      collection.showFunko(args.id);
    }
  )
  .command(
    "modify",
    "Modifica un Funko en la colección de un usuario",
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
      const funko = new Funko(
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
      const collection = new FunkoCollection(args.user);
      collection.modifyFunko(funko);
    }
  )
  .help()
  .parse();