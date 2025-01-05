const checkExecServiceAvailable = (req, res, next) => {
    if (process.env.NO_EXECUTION && process.env.NO_EXECUTION.toLowerCase() === 'true') {
        return res.status(503).json({
            msg: "Service Temporarily Unavailable",
            error: "Our servers are currently unable to process code execution. Please try again later."   
        });
    }
    next();
};

module.exports = checkExecServiceAvailable;
