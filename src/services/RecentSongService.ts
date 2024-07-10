import RecentSongDatabase from "../database/RecentSongDatabase";
import RecentSongModel from "../model/RecentSongModel";

export class RecentSongService {
    recentSongDatabase: RecentSongDatabase
    constructor(i: RecentSongDatabase) {
        this.recentSongDatabase = i
    }
    async Add(user_id: string, Id_song: string) {
        var check = await this.recentSongDatabase.Add(user_id, Id_song)

        return check;
    }
    async GetAllByidUser(id: string) {
        var ls = await this.recentSongDatabase.GetAllByidUser(id)
        return this.SetLs(ls);
    }

    async Get(user_id: string, Id_song: string) {
        var check = await this.recentSongDatabase.Get(user_id, Id_song) as RecentSongModel[]
        if (check && check.length) {
            var temp = new RecentSongModel()
            temp.setAll(check[0])
            return temp
        }
        return undefined;
    }
    async UpdateTime(user_id: string, Id_song: string) {
        var check = await this.recentSongDatabase.UpdateTime(user_id, Id_song)
        return check
    }
    SetLs(ls: any): RecentSongModel[] {
        if (ls == undefined) {
            return []
        }
        var check = []
        for (let i = 0; i < ls.length; i++) {
            const element = ls[i];
            var temp = new RecentSongModel()
            temp.setAll(element)
            check.push(temp)
        }
        return check
    }
}


var recentSongService = new RecentSongService(new RecentSongDatabase())

export default recentSongService