import express from 'express';
import controller from './matriculacontroller';

export default express
  .Router()
  .post('/', controller.registrarMatricula)
  .put('/:id', controller.atualizarMatricula)
  .get('/', controller.consultarMatriculas)
  .get('/:id', controller.consultarMatricula);