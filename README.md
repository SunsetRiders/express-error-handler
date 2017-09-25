# Express Error Handler
A simple express error handler middleware.

## Project dependencies

Every error throwed by any route method on the API will be parsed by this middleware function and then logged with the Logger module. It will also deliver to the requester app (resource requester) a json object containing the error message and the stack trace.

**IMPORTANT: Stack trace will only be shown if *process.env.NODE_ENV* variable is configured to *development* so this way we take care to not display to the client application (resource requester) when in production or homologation our stack trace.**

To do that you **MUST PROPERLY** install this **REQUIRED** module and configure it:

**logger*

https://github.com/SunsetRiders/logger

The logger type mehtod used to store the log will always be *req.logger.error*.

## Adding the module to the project

Add this into your **package.json** file.

**IMPORTANT: This is not a npm module but will work the same way, you must add manualy because the base code is here in GitHub.**

```javascript
"dependencies": {
  ...
  "express-error-handler": "git@github.com:SunsetRiders/express-error-handler.git"
}
 ```
 
 You can also install with terminal:
 
 ```javascript
 $ npm i --save git+https://github.com/SunsetRiders/express-error-handler.git
 ```
## Usage

This is a middleware and must be the last one so it can intercept all application`s errors objects.

*Add the code below into you **app.js** file.*

 ```javascript
const ExpressErrorHandler = require("express-error-handler");
const Logger              = require('logger');

...
// DON'T FORGET TO ADD THE LOGGER
// MODULE BEFORE THE ERROR HANDLER MIDDLEWARE
// Set request middleware express
app.use(ExpressXRequestId.requestMiddleware);

// Set response middleware express
app.use(ExpressXRequestId.responseMiddleware);

// Express error handler middleware
app.use(ExpressErrorHandler.middleware);
...
 ```


