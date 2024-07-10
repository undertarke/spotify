import { Router } from "express";
import searchControll from "../controller/SearchControll";




const SearchRoute = Router()

SearchRoute.post("/", searchControll.SearchNameArtist)//0k
SearchRoute.post("/user", searchControll.SearchName)//0k

export default SearchRoute