"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.sendJsonResponse = void 0;
// Function to send a JSON response
function sendJsonResponse(res, data, statusCode) {
    if (statusCode === void 0) { statusCode = 200; }
    res.status(statusCode).json(data);
}
exports.sendJsonResponse = sendJsonResponse;
// Middleware function for handling errors
function errorHandler(err, req, res) {
    console.error(err);
    res.status(500).send('Internal Server Error');
}
exports.errorHandler = errorHandler;
