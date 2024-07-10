"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ContainController_1 = __importDefault(require("../controller/ContainController"));
const ContainRouteAdmin = (0, express_1.Router)();
ContainRouteAdmin.post("/add", ContainController_1.default.Add);
ContainRouteAdmin.post("/delete", ContainController_1.default.Delete);
exports.default = ContainRouteAdmin;
