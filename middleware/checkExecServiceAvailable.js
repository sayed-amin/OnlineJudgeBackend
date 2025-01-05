const checkExecServiceAvailable = (req, res, next) => {
    if (process.env.NO_EXECUTION && process.env.NO_EXECUTION.toLowerCase() === 'true') {
        return res.status(503).json({
            msg: "Execution service not available",
            error: "Sorry currently server can't handle code execution"
        });
    }
    next();
};

module.exports = checkExecServiceAvailable;
