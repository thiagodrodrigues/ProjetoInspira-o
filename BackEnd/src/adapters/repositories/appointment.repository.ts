import { IDatabaseModel } from "../../infrastructure/persistence/database.model.interface";
import { AppointmentEntity } from "../../domain/entities/appointment/type.appointment.entity";
import { MySqlDatabase } from "../../infrastructure/persistence/mysql/mysql.database";
import { IAppointmentRepository } from "../../domain/repositories/appointment.repository.interface";
import * as Sequelize from 'sequelize';
import appointmentModelsMysqlDB from "../../infrastructure/persistence/mysql/models/appointment.models.mysql.DB";
import patients_fisioterapistsModelsMysqlDB from "../../infrastructure/persistence/mysql/models/patients_fisioterapists.models.mysql.DB";
import appointmentModeltoEntityMysql from "../../infrastructure/persistence/mysql/helpers/appointment.modeltoEntity.mysql.DB";
import appointmentsEntitiestoModelMysql from "../../infrastructure/persistence/mysql/helpers/appointment.entitiestoModel.mysql.DB";


export class AppointmentRepository implements IAppointmentRepository {
    constructor(
        private _database: IDatabaseModel, 
        private _modelAppointment: Sequelize.ModelCtor<Sequelize.Model<any, any>>,
        private _modelPatientFisioterapist: Sequelize.ModelCtor<Sequelize.Model<any, any>>,
        ){
          this._modelPatientFisioterapist.hasMany(this._modelAppointment, {
              foreignKey: 'idPatientFisioterapist',
              as: 'appointments'
          });
          this._modelAppointment.belongsTo(this._modelPatientFisioterapist, {
            foreignKey: 'idPatientFisioterapist',
            as: 'patients_fisioterapists',
          });
      }

    async create(resource: AppointmentEntity): Promise<AppointmentEntity> {
        const { appointmentGeneral }  = appointmentsEntitiestoModelMysql(resource);
        
        const userModel = await this._database.create(this._modelAppointment, appointmentGeneral);
        let response = await appointmentModeltoEntityMysql(userModel);

        return response!;
    }


}

export default new AppointmentRepository(
    MySqlDatabase.getInstance(),
    appointmentModelsMysqlDB,
    patients_fisioterapistsModelsMysqlDB
    );