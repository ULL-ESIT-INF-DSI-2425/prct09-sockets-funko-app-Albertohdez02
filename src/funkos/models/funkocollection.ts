import * as fs from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";
import chalk from "chalk";
import { Funko } from "./funko.js";

/**
 * Class that represents a funko collection and its operation
 * 
 * Class Funko collection
 */
export class FunkoCollection {
  accessor _userDir: string;

  /**
   * Constructs a funko collection
   * @param username - username of the owner of the collection (string)
   */
  constructor(private username: string) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    this._userDir = path.join(__dirname, "../../../data", username);

    fs.mkdir(this._userDir, { recursive: true }).catch(console.error);
  }

  /**
   * Adds a funko to a collection
   * @param funko - funko to be added to the collection (Funko)
   */
  async addFunko(funko: Funko) {
    const funkoPath = path.join(this._userDir, `${funko.id}.json`);
    try {
      await fs.access(funkoPath);
      console.log(chalk.red(`Funko with ID ${funko.id} already exists!`));
    } catch {
      await fs.writeFile(funkoPath, JSON.stringify(funko, null, 2));
      console.log(chalk.green(`New Funko added to ${this.username}'s collection!`));
    }
  }

  /**
   * Modifies the attributes of a Funko in the collection
   * @param updatedFunko - modified funko (Funko)
   */
  async modifyFunko(updatedFunko: Funko) {
    const funkoPath = path.join(this._userDir, `${updatedFunko.id}.json`);
    try {
      await fs.access(funkoPath);
      await fs.writeFile(funkoPath, JSON.stringify(updatedFunko, null, 2));
      console.log(chalk.green(`Funko with ID ${updatedFunko.id} has been updated!`));
    } catch {
      console.log(chalk.red(`Funko with ID ${updatedFunko.id} not found!`));
    }
  }

  /**
   * Removes a Funko from the collection
   * @param funkoId - ID of the funko to be removed (number)
   */
  async removeFunko(funkoId: number) {
    const funkoPath = path.join(this._userDir, `${funkoId}.json`);
    try {
      await fs.access(funkoPath);
      await fs.unlink(funkoPath);
      console.log(chalk.green(`Funko with ID ${funkoId} has been removed!`));
    } catch {
      console.log(chalk.red(`Funko with ID ${funkoId} not found!`));
    }
  }

  /**
   * Displays the entire collection of a user
   * @returns the entire funko collection of a user
   */
  async listFunkos(): Promise<Funko[]> {
    let funkoList: Funko[] = [];
    try {
      const files = await fs.readdir(this._userDir);
      if (files.length === 0) {
        console.log(chalk.red(`${this.username} has no Funkos!`));
        return;
      }
      console.log(chalk.blue.bold(`${this.username}'s Funko Collection:`));
      for (const file of files) {
        const filePath = path.join(this._userDir, file);
        const data = await fs.readFile(filePath, "utf-8");
        const funko = Funko.fromJSON(JSON.parse(data));
        if (funko != null) {
          let marketValueColor;
          if (funko.marketValue >= 50) {
            marketValueColor = chalk.green; 
          } else if (funko.marketValue >= 30) {
            marketValueColor = chalk.yellow;
          } else if (funko.marketValue >= 10) {
            marketValueColor = chalk.magenta; 
          } else {
            marketValueColor = chalk.red; 
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
        funkoList.push(funko);
      }
    } catch {
      console.log(chalk.red("Error listing Funkos."));
    }
    return funkoList;
  }

  /**
   * Display the information of a certain funko in a collection
   * @param id - ID of the funko to display (number)
   */
  async showFunko(id: number): Promise<Funko> {
    const filePath = path.join(this._userDir, `${id}.json`);
    try {
      const data = await fs.readFile(filePath, "utf-8");
      const funko = Funko.fromJSON(JSON.parse(data));
      if (funko != null) {
        let marketValueColor;
        if (funko.marketValue >= 100) {
          marketValueColor = chalk.green; 
        } else if (funko.marketValue >= 50) {
          marketValueColor = chalk.yellow; 
        } else if (funko.marketValue >= 20) {
          marketValueColor = chalk.magenta; 
        } else {
          marketValueColor = chalk.red; 
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
      return funko;
    } catch {
      console.log(chalk.red(`Funko with ID ${id} not found!`));
    }
  }
}
