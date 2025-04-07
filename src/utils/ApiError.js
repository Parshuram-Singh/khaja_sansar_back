// utils/ApiError.js

/**
 * Custom error class for Khaja Sansar API error handling
 * @class
 * @extends Error
 */
class ApiError extends Error {
    /**
     * Creates an instance of ApiError
     * @param {number} statusCode - HTTP status code
     * @param {string} [message="Something went wrong with Khaja Sansar service"] - Error message
     * @param {Array} [errors=[]] - Array of error details
     * @param {string} [stack=""] - Custom stack trace
     * @param {string} [path] - API endpoint path where error occurred
     */
    constructor(statusCode, message = "Something went wrong with Khaja Sansar service", errors = [], stack = "", path) {
        super(message);
        
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;
        this.timestamp = new Date().toISOString();
        this.path = path;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    /**
     * Creates a generic error instance
     * @param {number} statusCode - HTTP status code
     * @param {string} message - Error message
     * @param {Array} [errors] - Error details
     * @param {string} [path] - API endpoint path
     * @returns {ApiError} New ApiError instance
     */
    static createError(statusCode, message, errors = [], path) {
        return new ApiError(statusCode, message, errors, "", path);
    }

    /**
     * Creates a subscription-specific error
     * @param {string} [message="Subscription processing failed"] - Error message
     * @param {string} [path] - API endpoint path
     * @returns {ApiError} New ApiError instance
     */
    static subscriptionError(message = "Subscription processing failed", path) {
        return new ApiError(402, message, [], "", path);
    }

    /**
     * Creates a delivery-specific error
     * @param {string} [message="Delivery processing failed"] - Error message
     * @param {string} [path] - API endpoint path
     * @returns {ApiError} New ApiError instance
     */
    static deliveryError(message = "Delivery processing failed", path) {
        return new ApiError(503, message, [], "", path);
    }
}

module.exports = { ApiError };