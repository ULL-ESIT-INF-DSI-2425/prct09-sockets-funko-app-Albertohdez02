import { Funko } from "../models/funko.js";

/**
 * Representes the response of the server
 * 
 * type ResponseType
 */
export type ResponseType = {
  type: 'add' | 'modify' | 'remove' | 'show' | 'list';
  success: boolean;
  funkoPops?: Funko[];
}