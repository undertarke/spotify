import GenreDatase from "../database/GenreDatase";
import GenreModel from "../model/GenreModel";
import { v4 as uuidv4 } from 'uuid';
export class GenreService {
    database: GenreDatase
    constructor(database: GenreDatase) {
        this.database = database
    }
    async Add(genre: GenreModel) {
        if (genre.Floor == 0) {
            var num = await this.GetMaxRight()
            genre.LeftGenre = num + 1
            genre.RightGenre = num + 2
            genre.idParent = "0"
            genre.Id = uuidv4()

            genre.Floor = 0
        } else {
            var temp = await this.Get(genre.idParent)
            if (!temp) {
                return undefined
            }
            let check = await this.CreateBlank(temp.RightGenre)
            if (!check) {
                return undefined
            }
            genre.LeftGenre = temp.RightGenre
            genre.RightGenre = temp.RightGenre + 1
            genre.idParent = temp.Id
            genre.Id = uuidv4()

            genre.Floor = temp.Floor + 1
        }
        var check = await this.database.Add(genre)
        return check
    }
    async Get(id: string) {
        var check, l
        l = await this.database.Get(id) as GenreModel[]
        if (l && l.length > 0) {
            check = new GenreModel()
            check.setAll(l[0])
        }
        return check
    }
    async GetAll() {
        var l = await this.database.GetAll() as GenreModel[]

        return this.Setls(l)
    }
    async GetAllLeftAndRight(Left: string, Right: string) {
        var l = await this.database.GetAllLeftAndRight(Left, Right) as GenreModel[], ls: GenreModel[] = []
        for (let i = 0; i < l.length; i++) {
            const element = l[i];
            var genre = new GenreModel()
            genre.setAll(element)
            ls.push(genre)

        }
        return ls
    }

    async GetGenreByName(name: string) {
        var check, l
        l = await this.database.GetGenreByName(name) as GenreModel[]
        if (l && l.length > 0) {
            check = new GenreModel()
            check.setAll(l[0])
        }
        return check
    }
    async GetAllByidParent(idParent: string) {
        var l = await this.database.GetAllByidParent(idParent) as GenreModel[], ls: GenreModel[] = []
        for (let i = 0; i < l.length; i++) {
            const element = l[i];
            var genre = new GenreModel()
            genre.setAll(element)
            ls.push(genre)

        }
        return ls
    }
    async GetMaxRight() {
        var l: any = await this.database.GetMaxRight() as []
        var check = -1
        if (l && l[0]["max"]) {
            check = l[0]["max"]
        }
        return check
    }

    async CreateBlank(Right: number) {
        var check
        check = await this.database.CreateBlank(Right)
        return check
    }
    async UpdateName(name: string, id: string) {
        var check = await this.database.UpdateName(name, id)
        return check
    }
    async DeleteBlank(id: string) {
        var genre = await this.Get(id)

        if (!genre) {
            return undefined
        }
        var check
        if (genre.RightGenre - genre.LeftGenre !== 1) {
            return undefined

        }
        check = await this.database.DeleteBlank(genre.RightGenre + "")

        return check
    }
    async Delete(id: string) {
        var check = await this.DeleteBlank(id)
        if (check == undefined) {
            return undefined
        }
        var check1 = await this.database.Delete(id)
        return check1
    }

    async GetIdParentByIdplaylist(IdPlaylist: string) {
        var ls = await this.database.GetIdParentByIdplaylist(IdPlaylist)
        return this.Setls(ls)
    }
    async GetAllByLimitFloor(floor: number) {
        var ls = await this.database.GetAllByLimitFloor(floor)
        return this.Setls(ls)
    }
    async GetChildrenByIdParent(idParent: string) {
        var ls = await this.database.GetChildrenByIdParent(idParent)
        return this.Setls(ls)
    }
    Setls(ls: any) {
        if (ls == undefined) {
            return []
        }
        var list: GenreModel[] = []
        for (let i = 0; i < ls.length; i++) {
            const element = ls[i];
            var genre = new GenreModel()
            genre.setAll(element)
            list.push(genre)

        }
        return list
    }
}


var genreService = new GenreService(new GenreDatase())


export default genreService


