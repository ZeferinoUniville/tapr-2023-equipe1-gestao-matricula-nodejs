import { Request, Response } from 'express';
import MatriculaService from '../../services/matricula.service';

export class MatriculaController {
  registrarMatricula(req: Request, res: Response): void {
    MatriculaService.registrarMatricula(req.body).then((r) => res.json(r));
  }

  atualizarMatricula(req:Request, res:Response): void{
    MatriculaService.atualizarMatricula(req.params['id'],req.body).then((r) => res.json(r));
  }

  consultarMatriculas(_: Request, res: Response): void {
    MatriculaService.consultarMatriculas().then((r) => res.json(r));
  }

  consultarMatricula(req:Request, res:Response): void{
    MatriculaService.consultarMatricula(req.params['id']).then((r) => res.json(r));
  } 
}

export default new MatriculaController();
