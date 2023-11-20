import express from 'express';
import controller from './alunocontroller';

export default express
  .Router()
  .get('/', controller.all)
  .get('/:id', controller.consultarAluno)
  .post('/', controller.post)
  .put('/:id', controller.atualizarAluno);
