class ExpressErrorHandler {

  static middleware(err, req, res, next) {
    const status   = err.statusCode || err.status || 500;
    const metadata = res.locals.metadata || {};
    var errors     = (res.locals.errors || []).concat([{
        message: err.message,
        stack: ((process.env.NODE_ENV === 'development') ? err.stack : null)
      }
    ]);

    req.logger.error({
      httpVersion: req.httpVersion,
      method:      req.method,
      url:         req.url,
      originalUrl: req.originalUrl,
      headers:     req.headers,
      query:       req.query,
      params:      req.params,
      body:        req.body,
      status,
      errors
    });

    res.status(status).json({
      errors,
      metadata,
    });
  }
};

module.exports = ExpressErrorHandler;
