# Express Error Handler
A simple express error handler middleware.

## Project dependencies

Every error throwed by any route method on the API will be parsed by this middleware function and then logged with the Logger module and will also deliver to the requester app an json containing the error message and the stack trace.

**IMPORTANT: Stack trace will only be executed if *process.env.NODE_ENV* variable is configured to *development* so this way we will take care to not display to the client application (resource requester) when in production or homologation our stack trace.

To do that you **MUST PROPERLY** install this **REQUIRED** module and configure it:

**logger*

https://github.com/SunsetRiders/logger

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
