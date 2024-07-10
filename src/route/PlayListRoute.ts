import { Router } from "express";
import playListController from "../controller/PlayListController";


const PlayListRoute = Router()


PlayListRoute.post("/GetAllPlayList", playListController.GetByGenreAdmin)//0k
PlayListRoute.get("/:idplaylist", playListController.GetPlayListById)//0k
export default PlayListRoute