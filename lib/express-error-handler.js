/**
 * A simple express error handler middleware for express.
 */
class ExpressErrorHandler {
    
      /**
       * Every error throw by any route method on the API will be parsed
       * by this middlware function
       *
       * @param {Error} err when we receive an exception
       * @param {Request} req The ExpressJS reqconfiguest object
       * @param {Response} res The ExpressJS response object
       * @param {Next} next The ExpressJS next object
       * @return {null} nothing important
       */
      static middleware(err, req, res, next) {
        const status = err.status || 500;
    
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
          error:       {message: err.message, stack: err.stack}
        });
    
        return res.status(status).json([{
          errors: {
            message: err.message,
            stack: ((process.env.NODE_ENV === 'development') ? err.stack : null)
          }
        }]);
      }
    
    }
    
    module.exports = ExpressErrorHandler;
    