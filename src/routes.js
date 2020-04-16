const express = require('express');

const routes = express.Router();

const UserController = require('./controllers/UserController');
const ClientController = require('./controllers/ClientController');


const SessionController = require('./controllers/SessionController');
const AuthenticController = require('./controllers/AuthenticController');




const auth = require('./middlewares/auth');

//Rotas para usuários
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.delete('/users/:id', UserController.delete);



//Rotas para clientes
routes.get('/clients', ClientController.index);
routes.post('/clients', ClientController.store);
routes.delete('/clients/:id', ClientController.delete);
routes.get('/clients/:id', ClientController.show);
routes.put('/clients/:id', ClientController.update);

//Rota para logar no sistema
routes.post('/sessions', SessionController.store);

//Rotas com autenticação
routes.use(auth.token);

//Rota para testar autenticação
routes.get('/authentic', AuthenticController.authentic);



module.exports =  routes;