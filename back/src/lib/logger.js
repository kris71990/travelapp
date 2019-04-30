'use strict';

const winston = require('winston');

const { 
  printf, timestamp, combine,
} = winston.format;

const fs = require('fs');
const path = require('path');

const logDir = 'logs';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const customFormat = printf((info) => {
  return `logger.${info.level} - ${info.timestamp} : ${info.message}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    customFormat,
  ),
  transports: [
    new winston.transports.File({ filename: path.join(logDir, `${new Date().toDateString().replace(/ /g, '-')}.log`), level: 'verbose' }),
    new winston.transports.Console({ format: customFormat, level: 'info' }),
  ],
});

logger.INFO = 'info';
logger.ERROR = 'error';
logger.VERBOSE = 'verbose';

export default logger;
