import { CommonRoutesConfig } from "./common.routes.config";
import usersControllers from "../controllers/users.controllers";
import usersMiddlewares from "../middlewares/users.middlewares";
import authMiddleware from "../middlewares/auth.middleware";
import express from "express";

export class UserRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UserRoutes');
    }

    configureRoutes(): express.Application {
                    
        this.app.route(`/login`)
            .post(usersControllers.login); // logar um usuário

        this.app.route('/users/create')
            .post(
                usersMiddlewares.validateRequiredEmailBodyFields, // Verifica se o campo Email foi preenchido
                usersMiddlewares.validateRequiredNameBodyFields, // Verifica se o campo Nome foi preenchido
                usersMiddlewares.validateRequiredPasswordBodyFields, // Verifica se o campo Senha foi preenchido
                usersMiddlewares.validateUserRepeated, // Verifica se o email informado é único
                usersControllers.createUser // Cria novo usuário
            );
        
        this.app.route('/users/:idUser')
            .all(authMiddleware.checkAuth)
            .get(usersControllers.getUserById) // Perfil do usuário logado
            .put(
                usersControllers.updateUser // Atualizar usuário
            )
            .delete(usersControllers.removeUser) // Deletar usuário
        
        this.app.route('/patients')
            .all(
                authMiddleware.checkAuth,
                usersMiddlewares.validateFisioterapist,
                )
            .get(usersControllers.listUser) // Lista todos os usuários

        return this.app;
    }
}