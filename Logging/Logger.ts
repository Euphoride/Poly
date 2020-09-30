/* -------------------------------------------------------------------------- */
/*                                  Logger.ts                                 */
/* -------------------------------------------------------------------------- */

// The Classic Logger contraption
export default class Logger {
    caller : string;

    constructor(caller : string) { 
        this.caller = caller;
    }

    log(message : string) {
        console.log("[" + this.caller + "]: " + message);
    }
}