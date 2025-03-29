import * as fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import chalk from "chalk";
import { Funko } from "./funko.js";
// import { FunkoType } from "../enums/funkotype.js";
// import { FunkoGenre } from "../enums/funkogenre.js";
// import { Funko } from "../models/funko.js";

/**
 * Class that represents a Funko Collection of a user
 *
 * Class FunkoCollection
 */
export class FunkoCollection {
  accessor _userDir: string;

  /**
   * Constructs a FunkoCollection object and creates the folder that will hold it
   * @param username - name of the user that will hold a collection on an specific folder
   */
  constructor(private username: string) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    this._userDir = path.join(__dirname, "../../data", username);
    if (!fs.existsSync(this._userDir)) {
      fs.mkdirSync(this._userDir, { recursive: true });
    }
  }

  /**
   * Adds a funko to the collection of a person
   * @param funko - funko to add to the collection (Funko)
   * @returns void
   */
  addFunko(funko: Funko): void {
    const funkoPath = path.join(this._userDir, `${funko.id}.json`);

    if (fs.existsSync(funkoPath)) {
      console.log(
        chalk.red(
          `Funko with ID ${funko.id} already exists in ${this.username}'s collection!`,
        ),
      );
      return;
    }

    fs.writeFileSync(funkoPath, JSON.stringify(funko, null, 2));
    console.log(
      chalk.green(`New Funko added to ${this.username}'s collection!`),
    );
  }

  /**
   * Modifies a funko object
   * @param updatedFunko - funko object to change
   * @returns
   */
  modifyFunko(updatedFunko: Funko): void {
    const funkoPath = path.join(this._userDir, `${updatedFunko.id}.json`);

    if (!fs.existsSync(funkoPath)) {
      console.log(
        chalk.red(
          `Funko with ID ${updatedFunko.id} not found in ${this.username}'s collection!`,
        ),
      );
      return;
    }

    fs.writeFileSync(funkoPath, JSON.stringify(updatedFunko, null, 2));
    console.log(
      chalk.green(
        `Funko with ID ${updatedFunko.id} has been updated in ${this.username}'s collection!`,
      ),
    );
  }

  /**
   * Removes a funko from the collection
   * @param funkoId - id of the funko object to remove from the collection
   * @returns
   */
  removeFunko(funkoId: number): void {
    const funkoPath = path.join(this._userDir, `${funkoId}.json`);

    if (!fs.existsSync(funkoPath)) {
      console.log(
        chalk.red(
          `Funko with ID ${funkoId} not found in ${this.username}'s collection!`,
        ),
      );
      return;
    }

    fs.unlinkSync(funkoPath);
    console.log(
      chalk.green(
        `Funko with ID ${funkoId} has been removed from ${this.username}'s collection!`,
      ),
    );
  }

  /**
   * Lists the entire collection of Funkos of a user
   * @returns
   */
  listFunkos(): void {
    const files = fs.readdirSync(this._userDir);
    if (files.length === 0) {
      console.log(
        chalk.red(`${this.username} has no Funkos in the collection!`),
      );
      return;
    }

    console.log(chalk.blue.bold(`${this.username}'s Funko Pop Collection:`));
    console.log(chalk.blue("--------------------------------------"));

    files.forEach((file) => {
      const filePath = path.join(this._userDir, file);
      const funkoData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      const funko = Funko.fromJSON(funkoData);

      if (funko != null) {
        let marketValueColor;
        if (funko.marketValue >= 50) {
          marketValueColor = chalk.green; // Alto valor
        } else if (funko.marketValue >= 30) {
          marketValueColor = chalk.yellow; // Medio-alto
        } else if (funko.marketValue >= 10) {
          marketValueColor = chalk.magenta; // Medio-bajo
        } else {
          marketValueColor = chalk.red; // Bajo valor
        }

        console.log(`
        ${chalk.cyan.bold("ID:")} ${funko.id}
        ${chalk.cyan.bold("Name:")} ${funko.name}
        ${chalk.cyan.bold("Description:")} ${funko.description}
        ${chalk.cyan.bold("Type:")} ${funko.type}
        ${chalk.cyan.bold("Genre:")} ${funko.genre}
        ${chalk.cyan.bold("Franchise:")} ${funko.franchise}
        ${chalk.cyan.bold("Number:")} ${funko.number}
        ${chalk.cyan.bold("Exclusive:")} ${funko.exclusive ? chalk.green("Yes") : chalk.red("No")}
        ${chalk.cyan.bold("Special Features:")} ${funko.specialFeatures || "None"}
        ${chalk.cyan.bold("Market Value:")} ${marketValueColor(`$${funko.marketValue}`)}
        `);
      }
    });

    console.log(chalk.blue("--------------------------------------"));
  }

  /**
   * Shows a single Funko from a user's collection
   * @param id - id of the funko to be shown
   * @returns 
   */
  showFunko(id: number): void {
    const filePath = path.join(this._userDir, `${id}.json`);

    if (!fs.existsSync(filePath)) {
      console.log(
        chalk.red(
          `Error: No Funko found with ID ${id} in ${this.username}'s collection.`,
        ),
      );
      return;
    }

    const funkoData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const funko = Funko.fromJSON(funkoData);

    if (funko != null) {
      let marketValueColor;
      if (funko.marketValue >= 100) {
        marketValueColor = chalk.green; // Alto valor
      } else if (funko.marketValue >= 50) {
        marketValueColor = chalk.yellow; // Medio-alto
      } else if (funko.marketValue >= 20) {
        marketValueColor = chalk.magenta; // Medio-bajo
      } else {
        marketValueColor = chalk.red; // Bajo valor
      }

      console.log(chalk.blue.bold(`Funko ID ${id} Information:`));
      console.log(chalk.blue("--------------------------------------"));

      console.log(`
      ${chalk.cyan.bold("ID:")} ${funko.id}
      ${chalk.cyan.bold("Name:")} ${funko.name}
      ${chalk.cyan.bold("Description:")} ${funko.description}
      ${chalk.cyan.bold("Type:")} ${funko.type}
      ${chalk.cyan.bold("Genre:")} ${funko.genre}
      ${chalk.cyan.bold("Franchise:")} ${funko.franchise}
      ${chalk.cyan.bold("Number:")} ${funko.number}
      ${chalk.cyan.bold("Exclusive:")} ${funko.exclusive ? chalk.green("Yes") : chalk.red("No")}
      ${chalk.cyan.bold("Special Features:")} ${funko.specialFeatures || "None"}
      ${chalk.cyan.bold("Market Value:")} ${marketValueColor(`$${funko.marketValue}`)}
      `);
    }

    console.log(chalk.blue("--------------------------------------"));
  }
}
