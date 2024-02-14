import express from 'express';
import debug from 'debug';
import constantsConfig from '../../../infrastructure/config/constants.config';
import createAppointmentUsecase from '../../../domain/usecases/appointment/createAppointment.appointment.usecase';
import appointmentService from '../services/appointment.service';
import createCalendarAppointmentUsecase from '../../../domain/usecases/appointment/createCalendar.appointment.usecase';
import checkCalendarAppointmentUsecase from '../../../domain/usecases/appointment/checkCalendar.appointment.usecase';
import getScheduleAppointmentUsecase from '../../../domain/usecases/appointment/getSchedule.appointment.usecase';
import readpatientfisioterapistUsersUsecase from '../../../domain/usecases/user/readpatientfisioterapist.users.usecase';
import createPatientFisioterapistUsersUsecase from '../../../domain/usecases/user/createPatientFisioterapist.users.usecase';
import getAppointmentForPatientAppointmentUsecase from '../../../domain/usecases/appointment/getAppointmentForPatient.appointment.usecase';
import getAppointmentByIdAppointmentUsecase from '../../../domain/usecases/appointment/getAppointmentById.appointment.usecase';

const log: debug.IDebugger = debug('app:appointment-controller');

class AppointmentController {

    async createAppointment(req: express.Request, res: express.Response) {
      try {
        let data = await readpatientfisioterapistUsersUsecase.execute(req.body);
        if(!data){
          data = await createPatientFisioterapistUsersUsecase.execute({
            idPatient: req.body.userInfo.idPatient,
            idFisioterapist: req.body.idFisioterapist
          });
        }
        try {
          const user = await createAppointmentUsecase.execute({
            idCalendar: req.body.idCalendar,
            idPatientFisioterapist: data!.idPatientFisioterapist,
            notes: req.body.notes,
            idFisioterapist: data?.idFisioterapist
          });
          log(user);
          res.status(201).send(user);
        } catch (error) {
          res.status(409).send({
            messages: constantsConfig.USERS.MESSAGES.ERROR.APPOINTMENT_ALREADY_EXISTS.replace('{DATE}', String(req.body.idCalendar))
          })
        }
        
      } catch (error) {
        res.status(500).send({
          messages: constantsConfig.STATUS.MESSAGES.STATUS500
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
        const getDate = await getScheduleAppointmentUsecase.execute({date: date, idFisioterapist: req.body.idFisioterapist});
        res.status(200).send(getDate)
      } catch (error) {
        res.status(500).send({
          messages: constantsConfig.STATUS.MESSAGES.STATUS500,
        })
      }
    }

    async getAppointment(req: express.Request, res: express.Response){
      try {
        const getDate = await getAppointmentForPatientAppointmentUsecase.execute({idPatient: req.body.userInfo.idPatient, status: req.query.status, idFisioterapist: req.body.userInfo.idFisioterapist});
        res.status(200).send(getDate)
      } catch (error) {
        res.status(500).send({
          messages: constantsConfig.STATUS.MESSAGES.STATUS500,
        })
      }
    }

    async getAppointmentById(req: express.Request, res: express.Response){
      try {
        const getAppointment = await getAppointmentByIdAppointmentUsecase.execute({idAppointment: Number(req.params.idAppointment)});
        const relation = appointmentService.checkRelationAppointmentUser(req.body.userInfo.idFisioterapist, getAppointment!.patients_fisioterapists!.idFisioterapist, req.body.userInfo.idPatient, getAppointment!.patients_fisioterapists!.idPatient)
        if(relation){
          res.status(200).send(getAppointment)
        } else {
          res.status(401).send({
            messages: constantsConfig.STATUS.MESSAGES.STATUS401,
          })
        }
      } catch (error) {
        res.status(500).send({
          messages: constantsConfig.STATUS.MESSAGES.STATUS500,
        })
      }
    }
}

export default new AppointmentController();