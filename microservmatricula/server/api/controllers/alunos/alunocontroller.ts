import {Request, Response} from 'express';
import AlunoService from 'server/api/services/aluno.service';

export class AlunoController{
    all(_:Request, res:Response): void{
        AlunoService.all().then((r) => res.json(r));  
    }
}

export default new AlunoController();