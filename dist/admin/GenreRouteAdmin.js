"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const GenreController_1 = __importDefault(require("../controller/GenreController"));
const path_1 = require("path");
const GenreRouteAdmin = (0, express_1.default)();
GenreRouteAdmin.get("/", (req, res) => {
    res.sendFile((0, path_1.join)(process.cwd(), "web/admin.html"));
});
GenreRouteAdmin.post("/Add", GenreController_1.default.Add); //0k
GenreRouteAdmin.post("/UpdateName", GenreController_1.default.UpdateName); //0k
GenreRouteAdmin.post("/Delete", GenreController_1.default.Delete); //0k
exports.default = GenreRouteAdmin;
