import { Request, Response } from 'express';
import AlunoService from '../../services/aluno.service';

export class AlunoController {
  all(_: Request, res: Response): void {
    AlunoService.all().then((r) => res.json(r));
  }

  consultarAluno(req:Request, res:Response): void{
    AlunoService.consultarAluno(req.params['id']).then((r) => res.json(r));
  } 

  post(req: Request, res: Response): void {
    AlunoService.registrarAluno(req.body).then((r) => res.json(r));
  }

  atualizarAluno(req:Request, res:Response): void{
    AlunoService.atualizarAluno(req.params['id'],req.body).then((r) => res.json(r));
}
}

export default new AlunoController();
