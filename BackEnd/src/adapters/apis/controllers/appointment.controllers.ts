import express from 'express';
import debug from 'debug';
import constantsConfig from '../../../infrastructure/config/constants.config';
import createAppointmentUsecase from '../../../domain/usecases/appointment/createAppointment.appointment.usecase';
import appointmentService from '../services/appointment.service';
import createCalendarAppointmentUsecase from '../../../domain/usecases/appointment/createCalendar.appointment.usecase';
import checkCalendarAppointmentUsecase from '../../../domain/usecases/appointment/checkCalendar.appointment.usecase';
import getScheduleAppointmentUsecase from '../../../domain/usecases/appointment/getSchedule.appointment.usecase';

const log: debug.IDebugger = debug('app:appointment-controller');

class AppointmentController {

    async createAppointment(req: express.Request, res: express.Response) {
      try {
/*         const data = await appointmentService.conversionData(req.body)
        const user = await createAppointmentUsecase.execute(data!);
        log(user);
        res.status(201).send(user); */
      } catch (error) {
        res.status(500).send({
          messages: constantsConfig.STATUS.MESSAGES.STATUS500,
        })
      }
    }

    async createSchedule(req: express.Request, res: express.Response){
      try {
        const data = await appointmentService.conversionDateSchedule(req.body);
        let newDate = [];
        let busyDate = [];
        for(let i=0; i<data.length; i++){
          const checkDate = await checkCalendarAppointmentUsecase.execute(data[i]);
          if(checkDate){
            newDate.push(await createCalendarAppointmentUsecase.execute(data[i]));
          } else {
            busyDate.push(data[i])
          }
        }
        res.status(201).send({
          "Datas Criadas": newDate, 
          "Datas já ocupadas": busyDate
        })
      } catch (error) {
        res.status(500).send({
          messages: constantsConfig.STATUS.MESSAGES.STATUS500,
        })
      }
    }

    async getSchedule(req: express.Request, res: express.Response){
      try {
        const date = await appointmentService.conversionForDate(req.body);
        const getDate = await getScheduleAppointmentUsecase.execute(date);
        res.status(200).send(getDate)
      } catch (error) {
        res.status(500).send({
          messages: constantsConfig.STATUS.MESSAGES.STATUS500,
        })
      }
    }
}

export default new AppointmentController();