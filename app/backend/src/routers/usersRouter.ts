import express = require('express');
import UsersService from '../services/users';
import UsersController from '../controllers/users';
import authenticator from '../middleweres/JWT';
import User from '../database/models/usersModel';
import responseHandler from '../utils/responseHandler';
import JWTAuthetificator from '../authentification/JWT';

const usersRouter = express.Router();
usersRouter.use(express.json());

const usersService = new UsersService(User, responseHandler);
const usersController = new UsersController(usersService, JWTAuthetificator);

usersRouter.post('/', usersController.login);
usersRouter.get('/validate', authenticator.auth, usersController.getRole);

export default usersRouter;
