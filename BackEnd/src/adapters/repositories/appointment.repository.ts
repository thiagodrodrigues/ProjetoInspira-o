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

    async create(resource: AppointmentEntity): Promise<AppointmentEntity> {
        const { appointmentGeneral }  = appointmentsEntitiestoModelMysql(resource);
        
        const userModel = await this._database.create(this._modelAppointment, appointmentGeneral);
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

    async readByDate(resource: Date): Promise<ICalendarEntity[] | undefined> {
        const calendarModel = await this._database.getAll(this._modelCalendar, undefined, {
            date: resource
          });
          return calendarModel!;
    }

}

export default new AppointmentRepository(
    MySqlDatabase.getInstance(),
    appointmentModelsMysqlDB,
    patients_fisioterapistsModelsMysqlDB,
    calendarModelsMysqlDB
    );