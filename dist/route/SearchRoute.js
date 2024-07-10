"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SearchControll_1 = __importDefault(require("../controller/SearchControll"));
const SearchRoute = (0, express_1.Router)();
SearchRoute.post("/", SearchControll_1.default.SearchNameArtist); //0k
SearchRoute.post("/user", SearchControll_1.default.SearchName); //0k
exports.default = SearchRoute;
