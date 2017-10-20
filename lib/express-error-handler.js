class ExpressErrorHandler {

  static middleware(err, req, res, next) {
    const metadata = res.locals.metadata || {};
    var errors     = (res.locals.errors || []).concat([{
      message: err.message
    }]);

    errors = errors.map(err => {
      return {
        message: err.message,
        stack: ((process.env.NODE_ENV === 'development')? err.stack : null)
      }
    });

    res.status(500).json({
      errors,
      metadata,
    });
  }
};

module.exports = ExpressErrorHandler;
