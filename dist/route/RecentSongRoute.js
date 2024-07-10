"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RecentSongController_1 = __importDefault(require("../controller/RecentSongController"));
const RecentSongRoute = (0, express_1.Router)();
RecentSongRoute.get("/", RecentSongController_1.default.GetAllByidUser); //0k
exports.default = RecentSongRoute;
