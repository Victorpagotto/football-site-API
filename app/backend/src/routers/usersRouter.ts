import express = require('express');
import UsersController from '../controllers/users';
import authenticator from '../middleweres/JWT';

const usersRouter = express.Router();
usersRouter.use(express.json());

usersRouter.post('/', UsersController.login);
usersRouter.get('/validate', authenticator.auth, UsersController.getRole);

export default usersRouter;
