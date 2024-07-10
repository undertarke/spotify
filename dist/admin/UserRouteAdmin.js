"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controller/UserController"));
const UserRouteAdmin = (0, express_1.Router)();
UserRouteAdmin.post("/userlist", UserController_1.default.GetAllUserAdmin); //0k
UserRouteAdmin.post("/addE", UserController_1.default.AddEAdmin); //0k
UserRouteAdmin.post("/getE", UserController_1.default.GetAllEAdmin); //0k
UserRouteAdmin.post("/deE", UserController_1.default.DeleteEAdmin); //0k
UserRouteAdmin.get("/edit/:id", UserController_1.default.GetEditUser); //0k
UserRouteAdmin.post("/edit", UserController_1.default.PostEditUser); //0k
UserRouteAdmin.post("/VertifyArtist", UserController_1.default.VertifyArtist); //OK
exports.default = UserRouteAdmin;
