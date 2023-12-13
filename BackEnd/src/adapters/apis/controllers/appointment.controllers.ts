import express from 'express';
import debug from 'debug';
import constantsConfig from '../../../infrastructure/config/constants.config';
import createAppointmentUsecase from '../../../domain/usecases/appointment/create.appointment.usecase';

const log: debug.IDebugger = debug('app:appointment-controller');

class AppointmentController {

    async createAppointment(req: express.Request, res: express.Response) {
      try {
        const user = await createAppointmentUsecase.execute(req.body);
        log(user);
        res.status(201).send(user);
      } catch (error) {
        res.status(500).send({
          messages: constantsConfig.STATUS.MESSAGES.STATUS500,
        })
      }
    }

}

export default new AppointmentController();