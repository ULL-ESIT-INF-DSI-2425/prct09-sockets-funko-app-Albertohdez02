import { describe, it, expect, beforeEach } from "vitest";
import { Funko } from "../../src/funkos/models/funko.js";
import { FunkoGenre } from "../../src/funkos/enums/funkogenre.js";
import { FunkoType } from "../../src/funkos/enums/funkotype.js";

describe("Funko Class", () => {
  let testFunko: Funko;

  beforeEach(() => {
    testFunko = new Funko(
      1,
      "Spider-Man",
      "Héroe de Marvel",
      "Pop!" as FunkoType,
      "Movies" as FunkoGenre,
      "Marvel",
      25,
      false,
      "Brilla en la oscuridad",
      15
    );
  });

  it("should create a Funko instance correctly", () => {
    expect(testFunko).toBeInstanceOf(Funko);
    expect(testFunko.id).toBe(1);
    expect(testFunko.name).toBe("Spider-Man");
    expect(testFunko.marketValue).toBe(15);
  });



  it("should allow updating properties", () => {
    testFunko.name = "Iron Man";
    testFunko.marketValue = 40;
    expect(testFunko.name).toBe("Iron Man");
    expect(testFunko.marketValue).toBe(40);
  });

  it("should convert to JSON correctly", () => {
    const json = testFunko.toJSON();
    expect(json).toEqual({
      id: 1,
      name: "Spider-Man",
      description: "Héroe de Marvel",
      type: "Pop!",
      genre: "Movies",
      franchise: "Marvel",
      number: 25,
      exclusive: false,
      specialFeatures: "Brilla en la oscuridad",
      marketValue: 15,
    });
  });

  it("should create a Funko instance from JSON", () => {
    const jsonData: object = {
      "id": 1,
      "name": "Goku",
      "description": "Guerrero Saiyan",
      "type": "Pop!",
      "genre": "Anime",
      "franchise": "Dragon Ball",
      "number": 23,
      "exclusive": true,
      "specialFeatures": "Super Saiyan hair",
      "marketValue": 35
    }

    const jsonData2: object = {
      "id": "id1",
      "name": "Goku",
      "description": "Guerrero Saiyan",
      "type": "Pop!",
      "genre": "Anime",
      "franchise": "Dragon Ball",
      "number": 23,
      "exclusive": true,
      "specialFeatures": "Super Saiyan hair",
      "marketValue": 35
    }

    
    const funkoFromJson = Funko.fromJSON(jsonData);
    const funkofailed = Funko.fromJSON(jsonData2);

    expect(funkofailed).toBeNull()
    
    if(funkoFromJson != null) {
      expect(funkoFromJson).toBeInstanceOf(Funko);
      expect(funkoFromJson.id).toBe(1);
      expect(funkoFromJson.name).toBe("Goku");
      expect(funkoFromJson.marketValue).toBe(35);
    }
  });
});
