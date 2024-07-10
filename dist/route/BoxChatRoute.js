"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BoxController_1 = __importDefault(require("../controller/BoxController"));
const BoxChatRoute = (0, express_1.Router)();
BoxChatRoute.post("/chat", BoxController_1.default.Chat); //0k
BoxChatRoute.post("/", BoxController_1.default.GetAllBoxChat); //0k
BoxChatRoute.post("/remove", BoxController_1.default.Remove); //0k
exports.default = BoxChatRoute;
