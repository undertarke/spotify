"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const GenreController_1 = __importDefault(require("../controller/GenreController"));
const GenreRoute = (0, express_1.default)();
GenreRoute.get("/GetAll", GenreController_1.default.GetAll); //0k
GenreRoute.get("/GetLimitFloor", GenreController_1.default.GetLimitFloor); //0k
GenreRoute.get("/:idParent", GenreController_1.default.GetByGenre); //0k
exports.default = GenreRoute;
