import { Request, Response } from "express";
import genreService, { GenreService } from "../services/GenreService";
import GenreModel from "../model/GenreModel";
import { v4 as uuidv4 } from 'uuid';
import playListService, { PlayListService } from "../services/PlayListService";


class GenreController {
    static service: GenreService = genreService
    static playlist: PlayListService = playListService
    constructor() {
    }

    async Add(req: Request, res: Response) {
        var genre = new GenreModel()
        genre.setAll(req.body)
        var check = await GenreController.service.Add(genre)

        if (check == undefined) {
            res.json({
                err: true
            })
            return
        }
        res.json({
            err: false
        })
    }
    async GetAll(req: Request, res: Response) {
        var check = await GenreController.service.GetAll()
        if (check == undefined) {
            res.json({
                err: true,
                ls: []
            })
            return
        }
        res.json({
            err: false,
            ls: check
        })
    }
    async UpdateName(req: Request, res: Response) {
        var Name = req.body.Name
        var Id = req.body.id
        var check = await GenreController.service.UpdateName(Name, Id)

        if (check) {
            res.json({
                err: false
            })
            return
        }
        res.json({
            err: true
        })
    }
    async Delete(req: Request, res: Response) {
        var id = req.body.id
        var check = await GenreController.service.Delete(id)
        if (check) {
            res.json({
                err: false
            })
            return
        }

        res.json({
            err: true
        })
    }
    async GetLimitFloor(req: Request, res: Response) {
        var check = await GenreController.service.GetAllByLimitFloor(2)
        if (check == undefined) {
            res.json({
                err: true,
                ls: []
            })
            return
        }
        res.json({
            err: false,
            ls: check
        })
    }
    async GetByGenre(req: Request, res: Response) {
        var idParent = req.params.idParent
        var ls = await Promise.all([GenreController.playlist.GetByGenre(idParent, 0, 10), 
            GenreController.service.GetChildrenByIdParent(idParent)])
        res.json({
            playlist: ls[0],
            genre: ls[1],
            err: false
        })
    }
}


var genreController = new GenreController()

export default genreController