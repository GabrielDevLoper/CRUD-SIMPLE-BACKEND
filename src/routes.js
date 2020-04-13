const express = require('express');

const routes = express.Router();

const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const AuthenticController = require('./controllers/AuthenticController');


const auth = require('./middlewares/auth');


routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.delete('/users/:id', UserController.delete);
routes.post('/sessions', SessionController.store);

routes.use(auth.token);

routes.get('/authentic', AuthenticController.authentic);



module.exports =  routes;