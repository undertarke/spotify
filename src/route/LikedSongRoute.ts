import {Router} from "express";
import likedSongController from "../controller/LikedSongController";

const LikedSongRoute = Router()

LikedSongRoute.get("/getall/:idartise", likedSongController.GetAll)//0k
LikedSongRoute.post("/add", likedSongController.Add)//0k
LikedSongRoute.post("/delete", likedSongController.Delete)//0k
LikedSongRoute.get("/likedsongs", likedSongController.GetAllLikedSong)//0k


export default LikedSongRoute