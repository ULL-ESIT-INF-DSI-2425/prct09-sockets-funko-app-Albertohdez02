import { FunkoType } from "../enums/funkotype.js"
import { FunkoGenre } from "../enums/funkogenre.js"

/**
 * Interfaces that defines the characteristics of a Funko figure
 * 
 * Interface Funko Figure
 */
export interface FunkoFigure {
  id: number,
  name: string,
  description: string,
  type: FunkoType,
  genre: FunkoGenre,
  franchise: string,
  number: number,
  exclusive: boolean,
  specialFeatures: string,
  marketValue: number
}