"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = exports.TryCatch = void 0;
const TryCatch = (controller) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield controller(req, res, next);
    }
    catch (err) {
        next(err);
    }
});
exports.TryCatch = TryCatch;
const ErrorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};
exports.ErrorMiddleware = ErrorMiddleware;
