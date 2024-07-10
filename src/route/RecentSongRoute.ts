import { Router } from "express";
import recentSongController from "../controller/RecentSongController";

const RecentSongRoute = Router()


RecentSongRoute.get("/", recentSongController.GetAllByidUser)//0k





export default RecentSongRoute