import ContainModel from "../model/ContainModel";
import containService, { ContainService } from "../services/ContainService";
import { Request, Response } from "express";
class ContainController {
    static contain: ContainService = containService

    async Add(req: Request, res: Response) {
        var d = new ContainModel()
        d.setAll(req.body)
        var check = await ContainController.contain.Add(d)
        res.json({
            err: check == undefined
        })
    }

    async Delete(req: Request, res: Response) {
        var d = new ContainModel()
        d.setAll(req.body)
        var check = await ContainController.contain.Delete(d)
        res.json({
            err: check == undefined
        })
    }
}


var containController = new ContainController()

export default containController