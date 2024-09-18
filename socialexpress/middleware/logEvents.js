const { format } = require('date-fns');
const fs = require('fs');
const fsPromise = require('fs').promises
const path = require('path');

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${message}\n`;
    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromise.mkdir(path.join(__dirname, '..', 'logs'));
        }
        await fsPromise.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
    } catch (error) {
        console.log('error', error);

    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    next();
}

module.exports = { logger, logEvents };