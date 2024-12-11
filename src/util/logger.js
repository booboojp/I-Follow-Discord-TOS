const pc = require('picocolors')
class Logger {
    static success(message) {
        console.log(pc.greenBright(`[SUCCESS]`) + ` ${message}`);
    }

    static error(message) {
        console.log(pc.redBright(`[ERROR]`) + `  ${message}`);
    }

    static info(message) {
        console.log(pc.blueBright(`[INFO]` + ` ${message}`));
    }

    static warn(message) {
        console.log(pc.yellowBright(`[WARN]` + ` ${message}`));
    }
}

module.exports = Logger;