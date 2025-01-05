const { logger, dateTimeNowFormated } = require('../utils/logging');

const loggingMiddleware = (req, res, next) => {
    logger.log(req.method, req.url, dateTimeNowFormated());
    next();
};

module.exports = loggingMiddleware;
