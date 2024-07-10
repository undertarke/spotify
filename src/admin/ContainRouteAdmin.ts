import express, { Router } from "express";
import containController from "../controller/ContainController"
import { join } from "path";


const ContainRouteAdmin = Router()


ContainRouteAdmin.post("/add", containController.Add)
ContainRouteAdmin.post("/delete", containController.Delete)

export default ContainRouteAdmin