import { Request, Response } from 'express';
import TurmaService from '../../services/turma.service';

export class TurmaController {
  updateEvent(req:Request, res:Response): void{
    TurmaService.updateEvent(req.body.data).then((r) => res.json(r)).catch(() => res.status(404).end());
  }
}

export default new TurmaController();