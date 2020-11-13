const { createLogger, transports, format } = require('winston');

// define the custom settings for each transport (file, console)
var options = {
    errorFile: {
        level: 'error',
        filename: `./logs/error.log`,
        handleExceptions: true,
        json: true,
        format: format.combine(
            format.label({ label: require.main.filename }),
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            format.json(),
        )
    },
    infoFile: {
        level: 'info',
        filename: `./logs/app.log`,
        json: true,
        format: format.combine(
            format.label({ label: require.main.filename }),
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            format.json(),
        )
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true
    }
};

// instantiate a new Winston Logger with the settings defined above
var logger = new createLogger({
    transports: [
      new transports.File(options.errorFile),
      new transports.File(options.infoFile),
      new transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
});

module.exports = logger;