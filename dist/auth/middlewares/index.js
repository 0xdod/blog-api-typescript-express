"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSignUpRequest = void 0;
const validators_1 = require("../validators");
function validateSignUpRequest(req, res, next) {
    const { error } = validators_1.signUpSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.message });
    }
    next();
}
exports.validateSignUpRequest = validateSignUpRequest;
