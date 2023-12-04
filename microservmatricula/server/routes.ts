import { Application } from 'express';
import examplesRouter from './api/controllers/examples/router';
import alunoRouter from './api/controllers/alunos/router';
import matriculaRouter from './api/controllers/matriculas/router';
import TurmaRouter from './api/controllers/turmas/router';

export default function routes(app: Application): void {
  app.use('/api/v1/examples', examplesRouter);
  app.use('/api/v1/alunos', alunoRouter);
  app.use('/api/v1/matriculas', matriculaRouter);
  app.use('/api/v1/turmas', TurmaRouter);
}
