"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PlayListController_1 = __importDefault(require("../controller/PlayListController"));
const PlayListRoute = (0, express_1.Router)();
PlayListRoute.post("/GetAllPlayList", PlayListController_1.default.GetByGenreAdmin); //0k
PlayListRoute.get("/:idplaylist", PlayListController_1.default.GetPlayListById); //0k
exports.default = PlayListRoute;
