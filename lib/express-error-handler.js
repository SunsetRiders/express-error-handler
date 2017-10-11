const ErrorNormalizer = require("./error-normalizer");

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
       * @return {null} nothing important
       */
      static middleware(err, req, res, next) {     

        const status = err.status || 500;
        let normalizedError;

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
    
        if ('name' in err) {
    
          switch (err.name) {
            case 'TokenExpiredError':
              normalizedError = ErrorNormalizer.parse({
                statusCode: 401,
      
                error: {
                  message: err.message,
                  expiredAt: err.expiredAt
                }
              });
      
              res.status(normalizedError.status).json(normalizedError.errors);
              return;
      
            case 'JsonWebTokenError':
              normalizedError = ErrorNormalizer.parse({
                statusCode: 401,
      
                error: {
                  message: err.message
                }
              });
      
              res.status(401).json(normalizedError);
              return;
            break;
          }
        }
      
        if ('errorCode' in err) {
    
          switch (err.errorCode) {
            case 'authentication.openapi.security':
              normalizedError = ErrorNormalizer.parse({
                statusCode: 401,
      
                error: {
                  message: 'Unauthorized'
                }
              });
      
              res.status(normalizedError.status).json(normalizedError.errors);
              return;
      
            break;
          }
        }
      
        if ('errors' in err) {
          return res.status(status).json(err.errors);
        }
            
        normalizedError = ErrorNormalizer.parse({
          statusCode: status,
      
          error: {
            message: err.message
          }
        });

        return res.status(normalizedError.status).json(normalizedError.errors);
      }
    
}
    
module.exports = ExpressErrorHandler;    
