// utils/ApiResponse.js

/**
 * Standard API response class for Khaja Sansar operations
 * @class
 */
class ApiResponse {
    /**
     * Creates an instance of ApiResponse
     * @param {number} statusCode - HTTP status code
     * @param {*} data - Response data
     * @param {string} [message="Khaja Sansar operation successful"] - Success message
     * @param {Object} [meta] - Additional metadata (e.g., pagination info)
     */
    constructor(statusCode, data, message = "Khaja Sansar operation successful", meta) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
        this.timestamp = new Date().toISOString();
        this.meta = meta;
    }

    /**
     * Creates a delivery success response
     * @param {*} data - Delivery data
     * @param {string} [message="Food delivery processed successfully"] - Success message
     * @returns {ApiResponse} New ApiResponse instance
     */
    static deliverySuccess(data, message = "Food delivery processed successfully") {
        return new ApiResponse(200, data, message);
    }

    /**
     * Creates a subscription success response
     * @param {*} data - Subscription data
     * @param {string} [message="Subscription created successfully"] - Success message
     * @returns {ApiResponse} New ApiResponse instance
     */
    static subscriptionSuccess(data, message = "Subscription created successfully") {
        return new ApiResponse(201, data, message);
    }

    /**
     * Creates a generic success response
     * @param {*} data - Response data
     * @param {number} [statusCode=200] - HTTP status code
     * @param {string} [message="Operation successful"] - Success message
     * @returns {ApiResponse} New ApiResponse instance
     */
    static success(data, statusCode = 200, message = "Operation successful") {
        return new ApiResponse(statusCode, data, message);
    }
}

module.exports = { ApiResponse };