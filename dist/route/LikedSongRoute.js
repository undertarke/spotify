"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LikedSongController_1 = __importDefault(require("../controller/LikedSongController"));
const LikedSongRoute = (0, express_1.Router)();
LikedSongRoute.get("/getall/:idartise", LikedSongController_1.default.GetAll); //0k
LikedSongRoute.post("/add", LikedSongController_1.default.Add); //0k
LikedSongRoute.post("/delete", LikedSongController_1.default.Delete); //0k
LikedSongRoute.get("/likedsongs", LikedSongController_1.default.GetAllLikedSong); //0k
exports.default = LikedSongRoute;
