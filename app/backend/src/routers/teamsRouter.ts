import express = require('express');
import TeamsController from '../controllers/teams';

const teamsRouter = express.Router();
teamsRouter.use(express.json());

teamsRouter.get('/', TeamsController.getAll);
teamsRouter.get('/:id', TeamsController.getById);

export default teamsRouter;
