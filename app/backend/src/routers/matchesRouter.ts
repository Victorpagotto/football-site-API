import express = require('express');
import matchesController from '../controllers/matches';
import authenticator from '../middleweres/JWT';

const matchesRouter = express.Router();
matchesRouter.use(express.json());

matchesRouter.put('/:id/finish', authenticator.auth, matchesController.finish);
matchesRouter.put('/:id', authenticator.auth, matchesController.update);
matchesRouter.get('/', matchesController.getAll);
matchesRouter.post('/', authenticator.auth, matchesController.create);

export default matchesRouter;
