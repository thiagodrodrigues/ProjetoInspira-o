import { CommonRoutesConfig } from "./common.routes.config";
import express from "express";

export class UserRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UserRoutes');
    }

    configureRoutes(): express.Application {
                    
        this.app.route(`/`)
            .post(); // logar um usuário

        this.app.route('/users/create')
            .post()

        return this.app;
    }
}