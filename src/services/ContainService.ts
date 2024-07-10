import { ResultSetHeader } from "mysql2";
import ContainDatabse from "../database/ContainDatabse";
import ContainModel from "../model/ContainModel";

export class ContainService {
    containdatabase: ContainDatabse
    constructor(i: ContainDatabse) {
        this.containdatabase = i
    }
    async Add(d: ContainModel) {

        var check: ResultSetHeader | undefined = await this.containdatabase.Add(d) as ResultSetHeader
        return check
    }
    async Get(d: ContainModel) {
        var check = await this.containdatabase.Get(d)
        var ls = this.Setls(check)
        return ls.length > 0 ? ls[0] : undefined;
    }
    async Delete(d: ContainModel) {
        var check = await this.containdatabase.Delete(d)
        return check
    }
    async GetAllByPlayList(PlayList_id: string) {
        var check = await this.containdatabase.GetAllByPlayList(PlayList_id)
        return this.Setls(check)
    }
    Setls(ls: any) {
        if (ls == undefined) {
            return []
        }
        var list: ContainModel[] = []
        for (let i = 0; i < ls.length; i++) {
            const element = ls[i];
            var tem = new ContainModel()
            tem.setAll(element)
            list.push(tem)
        }
        return list
    }
}

var containService = new ContainService(new ContainDatabse())

export default containService