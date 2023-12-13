import { CommonRoutesConfig } from "./common.routes.config";
import appointmentControllers from "../controllers/appointment.controllers";
import authMiddleware from "../middlewares/auth.middleware";
import express from "express";

export class AppointmentRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'AppointmentRoutes');
    }

    configureRoutes(): express.Application {
        
        this.app.route(`/appointment`)
        .all(authMiddleware.checkAuth)
        .post(appointmentControllers.createAppointment); // Criar agendamento

        return this.app;
    }
}