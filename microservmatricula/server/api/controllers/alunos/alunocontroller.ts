import { Request, Response } from 'express';
import AlunoService from '../../services/aluno.service';

export class AlunoController {
  updateEvent(req:Request, res:Response): void{
    AlunoService.updateEvent(req.body.data).then((r) => res.json(r)).catch(() => res.status(404).end());
  }
}

export default new AlunoController();
