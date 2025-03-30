import * as net from 'net';
import chalk from 'chalk';
import { RequestType } from '../types/requesttype.js';
import { ResponseType } from '../types/responsetype.js';
// import { Funko } from './funko.js';
// import { FunkoCollection } from './funkocollection.js';


/**
 * Class that manages a Client of a FunkoServer that owns a FunkoCollection
 * 
 * Class FunkoClient
 */
export class FunkoClient {
  private socket: net.Socket;

  /**
   * Constructs a FunkClient and manages a connection to a server
   * @param serverHost - host of the server (string)
   * @param serverPort - port that hold the communication to the server (number)
   */
  constructor(private serverHost: string, private serverPort: number) {
    this.socket = new net.Socket();

    this.socket.connect(this.serverPort, this.serverHost, () => {
      console.log(`Connected to server on ${this.serverHost}:${this.serverPort}`);
    });

    this.socket.on('data', (data) => {
      try {
        const response: ResponseType = JSON.parse(data.toString());
        this.handleResponse(response);
      } catch (error) {
        console.error(chalk.red('Error receiving response from the server:', error));
      }
    });

    this.socket.on('error', (error) => {
      console.error(chalk.red('Error de conexión:', error));
    });
  }

  /**
   * Handles the response of the server
   * @param response - server's response (ResponseType)
   */
  private handleResponse(response: ResponseType): void {
    if (response.success) {
      switch (response.type) {
        case 'add':
          if(response.success) {
            console.log(chalk.green('Funko Pop successfully added!.'));
          } else {
            console.log(chalk.red('Funko already exists.'));
          }
          break;
        case 'modify':
          if(response.success) {
            console.log(chalk.green('Funko Pop successfully modified!.'));
          } else {
            console.log(chalk.red('Could not modify the funko.'));
          }
          break;
        case 'remove':
          if(response.success) {
            console.log(chalk.green('Funko Pop successfully removed from the collection!.'));
          } else {
            console.log(chalk.red('Funko is not in the collection.'));
          }
          break;
        case 'show':
          if(response.success) {
            const funko = response.funkoPops[0];
            if(funko != null) {
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
        
              console.log(chalk.blue.bold(`Funko with ID ${funko.name} information`));
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
          } else {
            console.log(chalk.red('Could not find funko in the collection.'));
          }
          break;
        case 'list':
          if (response.funkoPops && response.funkoPops.length > 0) {
            console.log(chalk.green.bold('FUNKO COLLECTION'));
            response.funkoPops.forEach((funko, index) => {
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
                console.log(chalk.blue('-------------------------------------\n'));
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
          } else {
            console.log(chalk.red('The collection is empty.'));
          }
          break;
        default:
          console.log(chalk.red('Unknown response type.'));
      }
    } else {
      console.log(chalk.red('There was a problem in the operation.'));
    }
  }

  /**
   * Sends the request to the server
   * @param request - request to be sent (RequestType)
   */
  sendRequest(request: RequestType): void {
    this.socket.write(JSON.stringify(request) + "\n");
  }
}