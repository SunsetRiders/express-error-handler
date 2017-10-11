
/**
 * Normalize the error object returned from the Portal.
 *
 * @param {Object} errorObj An error object, generally the result from 'request-promise' module
 *
 * @return {Object} normalizedError A normalized error object to be returned to our exposed API
 * @return {number} normalizedError.status The status code
 * @return {Array.<string>} normalizedError.errors An array of error messages
 */
class ErrorNormalizer {

    static parse(errorObj) {
        // Sometimes it arrives unparsed.. Don't know why
        try {
            errorObj.error = JSON.parse(errorObj.error);
        } catch (error) {
            // Does nothing
        }

        let normalizedError = {
            status: errorObj.statusCode || 500,
            errors: []
        };

        // Got field 'errors' on reponse?
        if (errorObj.error && Array.isArray(errorObj.error.errors)) {
            normalizedError.errors = errorObj.error.errors;
            return normalizedError;
        }

        // Got field 'message' on reponse?
        if (errorObj.error && errorObj.error.message) {
            /*
            * FIXME: This scenario should be removed in the future.
            * For now, just inform us that it's happening.
            */

            normalizedError.errors = [{
            message: errorObj.error.message,
            field: null
            }];

            return normalizedError;
        }

        // Otherwise,
        return normalizedError;
    }

}

module.exports = ErrorNormalizer;
