"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const NotificationController_1 = __importDefault(require("../controller/NotificationController"));
const NotificationRoute = (0, express_1.Router)();
NotificationRoute.post("/all", NotificationController_1.default.GetAll); //0k
NotificationRoute.post("/delete", NotificationController_1.default.Delete); //0k
exports.default = NotificationRoute;
