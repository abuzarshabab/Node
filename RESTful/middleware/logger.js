function log(req, res, next) {
    console.log('validating Completed');
    next();
}

module.exports = log;

