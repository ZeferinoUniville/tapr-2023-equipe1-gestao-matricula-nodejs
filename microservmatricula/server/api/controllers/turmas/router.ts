import express from 'express';
import controller from './turmacontroller';

export default express
    .Router()
    .post('/event', controller.updateEvent);
