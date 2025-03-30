import { Funko } from "../models/funko.js";

/**
 * Represents a request from the client
 * 
 * type RequestType
 */
export type RequestType = {
  type: 'add' | 'modify' | 'remove' | 'show' | 'list';
  username: string,
  funkoId?: number,
  funkoPop?: Funko[]
}