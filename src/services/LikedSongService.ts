import LikedSongDatabase from "../database/LikedSongDatabase";
import LikedSongModel from "../model/LikedSongModel";

export class LikedSongService {
    likedSongDatabase: LikedSongDatabase
    constructor(likedSongDatabase: LikedSongDatabase) {
        this.likedSongDatabase = likedSongDatabase
    }
    async Add(d: LikedSongModel) {
        var check = await this.likedSongDatabase.Add(d)
        return check;
    }
    async Delete(d: LikedSongModel) {
        var check = await this.likedSongDatabase.Delete(d)
        return check;
    }
    async GetAll(d: LikedSongModel) {
        var ls = await this.likedSongDatabase.GetAll(d)
        return this.SetLs(ls);
    }
    async Update(d: LikedSongModel) {
        var check = await this.likedSongDatabase.Update(d)
        return check;
    }
    async Get(d: LikedSongModel) {
        var check = await this.likedSongDatabase.Get(d)
        var ls = this.SetLs(check)
        return ls.length > 0 ? ls[0] : undefined;
    }
    async GetAllLikedSong(d: LikedSongModel) {
        var check = await this.likedSongDatabase.GetAllLikedSong(d)
        var ls = this.SetLs(check)
        return ls;
    }
    async SearchName(name: string, iduser: string) {
        var ls = await this.likedSongDatabase.SearchName(name, iduser)
        return this.SetLs(ls)
    }
    async GetAllByIdPlayList(id_user_liked: string, id_playlist: string) {
        var ls = await this.likedSongDatabase.GetAllByIdPlayList(id_user_liked, id_playlist)
        return this.SetLs(ls)
    }
    SetLs(ls: any) {
        if (ls == undefined) {
            return []
        }
        var check: LikedSongModel[] = []
        for (let i = 0; i < ls.length; i++) {
            const element = ls[i];
            var temp = new LikedSongModel()
            temp.setAll(element)
            check.push(temp)
        }
        return check
    }
}


var likedSongService = new LikedSongService(new LikedSongDatabase())

export default likedSongService