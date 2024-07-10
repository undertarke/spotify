import { join } from "path";
import ContainModel from "../model/ContainModel";
import { PlayListModel } from "../model/PlayListModel";
import containService, { ContainService } from "../services/ContainService";

import playListService, { PlayListService } from "../services/PlayListService";
import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import genreService, { GenreService } from "../services/GenreService";
import { unlink } from "fs/promises";
import likedSongService, { LikedSongService } from "../services/LikedSongService";

export class PlayListController {
    static playlist: PlayListService = playListService
    static contain: ContainService = containService
    static genre: GenreService = genreService
    static likedSong: LikedSongService = likedSongService
    async AddPlayListByAdmin(req: Request, res: Response) {
        var file = req.file?.filename as any as string

        var playlistmodel = new PlayListModel()
        playlistmodel.setAll(req.body)
        playlistmodel.id = uuidv4()
        playlistmodel.User_id = req.cookies.id
        playlistmodel.Type = 1
        playlistmodel.Songs = req.body.ls.length
        playlistmodel.ImagePath = join("public/playlist", file)



        var check = await playListService.Add(playlistmodel)

        var ls = req.body.ls as string[]

        var list = ls.map(async (Song_id) => {
            var temp = new ContainModel()
            temp.PlayList_id = playlistmodel.id
            temp.Song_id = Song_id
            return await PlayListController.contain.Add(temp)
        })

        var checkls = await Promise.all(list)
        res.json({
            err: false
        })
    }
    async GetByGenreAdmin(req: Request, res: Response) {
        var Genre_ID = req.body.Genre_ID
        var ls = await PlayListController.playlist.GetByGenre(Genre_ID, 0, 10)

        res.json({
            ls: ls, err: true
        })
    }
    async PlayListDetailAdmin(req: Request, res: Response) {
        var idplaylist = req.params.idplaylist


        var ls = await Promise.all([PlayListController.playlist.Get(idplaylist),
        PlayListController.contain.GetAllByPlayList(idplaylist), PlayListController.
            genre.GetIdParentByIdplaylist(idplaylist)])


        res.json({
            err: ls[0] == undefined,
            playlist: ls[0],
            songs: ls[1],
            genre: ls[2]
        })
    }
    async UpdatePlayListDetailAdmin(req: Request, res: Response) {
        var oldplaylist = await PlayListController.playlist.Get(req.body.id)
        if (!oldplaylist) {
            res.json({
                err: true
            })
            return
        }
        var playlistmodel = new PlayListModel()
        playlistmodel.setAll(req.body)
        if (req.file) {
            playlistmodel.ImagePath = join("public/playlist", req.file.filename)
            try {
                await unlink(join(process.cwd(), oldplaylist.ImagePath))
            } catch (error) {
                console.log(error);

            }
        }
        playlistmodel.id = oldplaylist.id
        playlistmodel.User_id = req.cookies.id
        playlistmodel.Type = 1
        if (req.body.ls) {
            playlistmodel.Songs = req.body.ls.length + oldplaylist.Songs
            var ls = req.body.ls as string[]
            var list = ls.map(async (Song_id) => {
                var temp = new ContainModel()
                temp.PlayList_id = playlistmodel.id
                temp.Song_id = Song_id
                return await PlayListController.contain.Add(temp)
            })

            var checkls = await Promise.all(list)
        }
        var check = await playListService.Update(playlistmodel)
        res.json({
            err: check == undefined
        })
    }
    async GetPlayListById(req: Request, res: Response) {
        var id_playlist = req.params.idplaylist

        var id = req.cookies.id
        var ls = await Promise.all([PlayListController.playlist.Get(id_playlist),
        PlayListController.likedSong.GetAllByIdPlayList(id, id_playlist)])

        res.json({
            playlist: ls[0],
            songs: ls[1],
            err: ls[0] == undefined
        })
    }
   
}

var playListController: PlayListController = new PlayListController()

export default playListController