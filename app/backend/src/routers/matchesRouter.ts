import express = require('express');
import matchesController from '../controllers/matches';
import authenticator from '../middleweres/JWT';

const matchesRouter = express.Router();
matchesRouter.use(express.json());

matchesRouter.patch('/:id/finish', matchesController.finish);
matchesRouter.patch('/:id', matchesController.update);
matchesRouter.get('/', matchesController.getAll);
matchesRouter.post('/', authenticator.auth, matchesController.create);

export default matchesRouter;
