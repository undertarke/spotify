import { ResultSetHeader } from "mysql2";
import DiscussDatabase from "../database/DiscussDatabase";
import DiscussModel from "../model/DiscussModel";

export class DiscussService {
    data: DiscussDatabase
    constructor(i: DiscussDatabase) {
        this.data = i
    }
    async Add(d: DiscussModel) {
        var check = await this.data.Add(d)
        return check
    }
    async GetMainDiscussBySong_Id(Song_Id: string) {
        var check = await this.data.GetMainDiscussBySong_Id(Song_Id)
        return this.Setls(check)
    }
    async GetReplayDiscussByParentDiscussId(Parent_discuss_Id: string) {
        var check = await this.data.GetReplayDiscussByParentDiscussId(Parent_discuss_Id)
        return this.Setls(check)
    }
    async Get(Discuss_Id: string) {
        var check = await this.data.Get(Discuss_Id)
        var list = this.Setls(check)
        return list.length > 0 ? list[0] : undefined
    }

    async Increase(Parent_discuss_Id: string, n?: number) {
        n = n || 1
        var check = await this.data.Increase(Parent_discuss_Id, n)
        return check
    }
    async DeIncrease(Parent_discuss_Id: string, n?: number) {
        n = n || 1
        var check = await this.data.DeIncrease(Parent_discuss_Id, n)
        return check
    }
    async Delete(Discuss_Id: string) {
        var check = await this.data.Delete(Discuss_Id)
        return check
    }
    async DeleteChildren(Parent_discuss_Id: string) {
        var check = await this.data.DeleteChildren(Parent_discuss_Id) as ResultSetHeader
        return check
    }
    Setls(ls: any) {
        var list: DiscussModel[] = []

        if (ls == undefined) {
            return list
        }
        for (let i = 0; i < ls.length; i++) {
            const element = ls[i];
            var tem = new DiscussModel()
            tem.setAll(element)
            list.push(tem)
        }
        return list
    }
}

var discussService = new DiscussService(new DiscussDatabase)

export default discussService