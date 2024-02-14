import { IDatabaseModel } from "../../infrastructure/persistence/database.model.interface";
import { AppointmentEntity } from "../../domain/entities/appointment/type.appointment.entity";
import { ICalendarEntity } from "../../domain/entities/appointment/calendar.entity.ts";
import { MySqlDatabase } from "../../infrastructure/persistence/mysql/mysql.database";
import { IAppointmentRepository } from "../../domain/repositories/appointment.repository.interface";
import * as Sequelize from 'sequelize';
import appointmentModelsMysqlDB from "../../infrastructure/persistence/mysql/models/appointment.models.mysql.DB";
import patients_fisioterapistsModelsMysqlDB from "../../infrastructure/persistence/mysql/models/patients_fisioterapists.models.mysql.DB";
import calendarModelsMysqlDB from "../../infrastructure/persistence/mysql/models/calendar.models.mysql.DB";
import appointmentModeltoEntityMysql from "../../infrastructure/persistence/mysql/helpers/appointment.modeltoEntity.mysql.DB";
import appointmentsEntitiestoModelMysql from "../../infrastructure/persistence/mysql/helpers/appointment.entitiestoModel.mysql.DB";
import appointmentService from "../apis/services/appointment.service";
import { IAppointmentEntity } from "../../domain/entities/appointment/appointment.entity";
import moment from "moment";
import { Op } from "sequelize";


export class AppointmentRepository implements IAppointmentRepository {
    constructor(
        private _database: IDatabaseModel, 
        private _modelAppointment: Sequelize.ModelCtor<Sequelize.Model<any, any>>,
        private _modelPatientFisioterapist: Sequelize.ModelCtor<Sequelize.Model<any, any>>,
        private _modelCalendar: Sequelize.ModelCtor<Sequelize.Model<any, any>>,
        ){
          this._modelPatientFisioterapist.hasMany(this._modelAppointment, {
              foreignKey: 'idPatientFisioterapist',
              as: 'appointments'
          });
          this._modelAppointment.belongsTo(this._modelPatientFisioterapist, {
            foreignKey: 'idPatientFisioterapist',
            as: 'patients_fisioterapists',
          });
          this._modelCalendar.hasOne(this._modelAppointment, {
              foreignKey: 'idCalendar',
              as: 'appointments'
          });
          this._modelAppointment.belongsTo(this._modelCalendar, {
            foreignKey: 'idCalendar',
            as: 'calendars',
          });
      }

    async create(resource: any): Promise<AppointmentEntity> {
        const { appointmentGeneral }  = appointmentsEntitiestoModelMysql(resource);
        
        const userModel = await this._database.create(this._modelAppointment, appointmentGeneral);
        if(userModel){
          const statusCalendar = {
            idCalendar: resource.idCalendar,
            idFisioterapist: resource.idFisioterapist,
            available: "Agendada"
          }
          const modelCalendar = await this._database.read(this._modelCalendar, resource.idCalendar);
          if(modelCalendar.available == "Livre"){
            await this._database.update(modelCalendar, statusCalendar);        
          } else {
            console.error("A Data não está disponível para agendamento");
            throw new Error("A Data não está disponível para agendamento"); 
          }
        }
        let response = await appointmentModeltoEntityMysql(userModel);
        return response!;

    }

    async createCalendar(resource: AppointmentEntity): Promise<AppointmentEntity> {
        const { calendarGeneral }  = appointmentsEntitiestoModelMysql(resource);
        
        const userModel = await this._database.create(this._modelCalendar, calendarGeneral);
        let response = await appointmentModeltoEntityMysql(userModel);

        return response!;
    }

    async checkCalendar(resource: ICalendarEntity): Promise<ICalendarEntity | undefined> {
        const { calendarGeneral }  = appointmentsEntitiestoModelMysql(resource);
        const times = appointmentService.calculateTimes(calendarGeneral!.time, calendarGeneral!.duration);
        const calendarModel = await this._database.getAll(this._modelCalendar, undefined, {
            date: new Date(calendarGeneral!.date)
          });
        let check = true;
        for(let i=0; i<calendarModel.length; i++){
          for(let index = 0; index<times.length; index++){
            if(times[index] == calendarModel[i].time){
              check = false;
              break
            }
          }
        }
        if(check){
          let response = await appointmentModeltoEntityMysql(calendarGeneral) as ICalendarEntity;
          return response!;
        } else {
          return
        }
    }

    async readByDate(resource: any): Promise<ICalendarEntity[] | undefined> {
        const calendarModel = await this._database.getAll(this._modelCalendar, undefined, {
            date: resource.date,
            idFisioterapist: resource.idFisioterapist
          });
          return calendarModel!;
    }

    async listAppointments(resourceId?: number, status?: string, idFisioterapist?: number): Promise<IAppointmentEntity[] | undefined> {
      let filter:any = {};
      if (status) {
        const today = moment(new Date()).format('YYYY-MM-DD');
        if (status === "1") {
          filter = {
            "$calendars.date$": {
              [Op.lt]: today
            }
          };
        } else if (status === "3") {
          filter = {
            "$calendars.date$": {
              [Op.gt]: today
            }
          };
        }else if (status === "2") {
          filter = {
            "$calendars.date$": today
          };
        }
      };
      if(resourceId){
        filter["$patients_fisioterapists.idPatient$"] = resourceId;
      }
      if(idFisioterapist){
        filter["$patients_fisioterapists.idFisioterapist$"] = idFisioterapist;
      }
      const appointmentModel = await this._database.getAll(this._modelAppointment, ['patients_fisioterapists', 'calendars'], filter);
      return appointmentModel!;
    }

    async readById(resourceId: number): Promise<IAppointmentEntity | undefined> {
        const appointmentModel = await this._database.read(this._modelAppointment, resourceId, {include: ['patients_fisioterapists']});
          return appointmentModel!;
    }

}

export default new AppointmentRepository(
    MySqlDatabase.getInstance(),
    appointmentModelsMysqlDB,
    patients_fisioterapistsModelsMysqlDB,
    calendarModelsMysqlDB
    );