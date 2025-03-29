import { FunkoType } from "../enums/funkotype.js";
import { FunkoGenre } from "../enums/funkogenre.js";
import { FunkoFigure } from "../interfaces/funkofigure.js";

/**
 * Class that represents a Funko figure
 *
 * Class Funko
 */
export class Funko implements FunkoFigure {
  /**
   * Creates a funko object with its attributes
   * @param id - unique id of a funko (number)
   * @param name - name of the figure (string)
   * @param description - description of the figure (string)
   * @param type - type of the figure (FunkoType)
   * @param genre - genre that the figure belongs to (FunkoGenre)
   * @param franchise - franchise that the figure belongs to (string)
   * @param number - identification number of the figure in a franchise (number)
   * @param exclusive - expresses if a figure is exclusive or not (boolean)
   * @param specialFeatures - expresses if the figure has any special features (string)
   * @param marketValue - price of the figure in the market (number)
   * @throws various errors if the parameters are not in a correct range
   */
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public type: FunkoType,
    public genre: FunkoGenre,
    public franchise: string,
    public number: number,
    public exclusive: boolean,
    public specialFeatures: string,
    public marketValue: number,
  ) {
    // //if (!Number.isInteger(id) || id >= 0) throw new Error("A funko ID must be a positive integer");
    // if (name == "") throw new Error("A funko must have a name");
    // if (description == "") throw new Error("A funko must have a description");
    // if (!Object.values(FunkoType).includes(type))
    //   throw new Error("Invalid funko type");
    // if (!Object.values(FunkoGenre).includes(genre))
    //   throw new Error("Invalid funko type");
    // if (franchise == "") throw new Error("A funko must belong to a franchise");
    // //if (!Number.isInteger(number) || number >= 0)throw new Error("A funko Number must be a positive integer");
    // //if (marketValue > 0)throw new Error("A funko price must be a positive number");
  }

  /**
   * Turns a Funko instance into a JSON object
   * @returns an object with the attributes of a Funko
   */
  toJSON(): object {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      type: this.type,
      genre: this.genre,
      franchise: this.franchise,
      number: this.number,
      exclusive: this.exclusive,
      specialFeatures: this.specialFeatures,
      marketValue: this.marketValue,
    };
  }

  /**
   * Turns an object JSON into an instance of a Funko object.
   * @param json - objet JSON with the structure of a Funko
   * @returns instance of a Funko object.
   */
  static fromJSON(json: Partial<Funko>): Funko | null {
    if (
      typeof json.id === "number" &&
      typeof json.name === "string" &&
      typeof json.description === "string" &&
      typeof json.franchise === "string" &&
      typeof json.number === "number" &&
      typeof json.exclusive === "boolean" &&
      typeof json.specialFeatures === "string" &&
      typeof json.marketValue === "number"
    ) {
      return new Funko(
        json.id,
        json.name,
        json.description,
        json.type!,
        json.genre!,
        json.franchise,
        json.number,
        json.exclusive,
        json.specialFeatures,
        json.marketValue,
      );
    } else {
      console.error("Couldn't create a Funko object from JSON file.");
      return null;
    }
  }
}
