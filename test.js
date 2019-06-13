// let Sequelize = require('sequelize');
// console.log(Sequelize.DataTypes.UUIDV1);
// Promise.resolve(42).then(result => console.log(result)).catch(err => console.log(err));
const winston = require('winston');
winston.info('this is a info log');
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});
logger.info('this is a info log');
logger.error('this is a error log');


const childLogger = logger.child({ requestId: '451' });
childLogger.info('child info log');

// const DailyRotateFile = require('winston-daily-rotate-file');
// const strftime = require('strftime');
// const fs = require('fs');
// const path = require('path');
//
// let logger;
//
// const LOG_PATH = '/path/to/logs';
// // logs for elk
// const ELK_PATH = '/path/to/elk/logs';
//
// const timestamp = () => strftime('%D %T');
//
// exports.getLogger = () => {
//     if (!logger) {
//         let transports = [
//             // for error
//             new winston.transports.File({
//                 filename: path.join(LOG_PATH, 'error.log'),
//                 level: 'error',
//                 timestamp
//             }),
//             // for normal
//             new DailyRotateFile({
//                 filename: path.join(LOG_PATH, 'main.log'),
//                 datePattern: 'yyyy-MM-dd.',
//                 localTime: true,
//                 prepend: true,
//                 timestamp
//             })
//         ]
//         if (fs.existsSync(ELK_PATH)) {
//             // for elk
//             transports.push(new winston.transports.File({
//                 name: 'elk',  // must provide a name
//                 filename: path.join(ELK_PATH, 'elk.log'),
//                 json: false,  // activate formatter option
//                 formatter: options => {
//                     let {level, message, meta} = options
//                     let {param1, param2} = meta
//                     return JSON.stringify({level, message, meta, param1, param2})
//                 }
//             }))
//         }
//         if (process.env.NODE_ENV === 'dev') {
//             // for development
//             transports.push(new winston.transports.Console({
//                 json: true,
//                 timestamp
//             })
//         }
//         logger = new (winston.Logger)({transports})
//     }
//     return logger
// };