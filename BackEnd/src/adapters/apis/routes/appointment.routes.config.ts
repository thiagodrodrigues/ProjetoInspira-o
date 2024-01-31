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
        .get(appointmentControllers.getSchedule)
        .post(appointmentControllers.createAppointment); // Criar agendamento

        this.app.route('/schedule')
            .all(authMiddleware.checkAuth)
            .post(appointmentControllers.createSchedule) // Gerar horários na agenda
        

        return this.app;
    }
}