import { IDatabaseModel } from "../../infrastructure/persistence/database.model.interface";
import { UsersEntity } from "../../domain/entities/user/type.users.entity";
import { PatientFisioterapistEntity } from "../../domain/entities/user/patient_fisioterapist.entity";
import { MySqlDatabase } from "../../infrastructure/persistence/mysql/mysql.database";
import { IUsersRepository } from "../../domain/repositories/users.repository.interface";
import * as Sequelize from 'sequelize';
import userModel from '../../infrastructure/persistence/mysql/models/user.models.mysql.DB';
import fisioterapistModels from "../../infrastructure/persistence/mysql/models/fisioterapist.models.mysql.DB";
import patientModels from "../../infrastructure/persistence/mysql/models/patient.models.mysql.DB";
import patients_fisioterapistsModelsMysqlDB from "../../infrastructure/persistence/mysql/models/patients_fisioterapists.models.mysql.DB";
import modelsToEntities from '../../infrastructure/persistence/mysql/helpers/users.modelstoEntities.mysql.DB';
import entitiesToModels from '../../infrastructure/persistence/mysql/helpers/users.entitiestoModel.mysql.DB';
import usersService from "../apis/services/users.service";


export class UsersRepository implements IUsersRepository {
    constructor(
        private _database: IDatabaseModel, 
        private _modelUser: Sequelize.ModelCtor<Sequelize.Model<any, any>>,
        private _modelFisioterapist: Sequelize.ModelCtor<Sequelize.Model<any, any>>,
        private _modelPatient: Sequelize.ModelCtor<Sequelize.Model<any, any>>,
        private _modelPatientFisioterapist: Sequelize.ModelCtor<Sequelize.Model<any, any>>,
        ){
          this._modelUser.hasOne(this._modelFisioterapist, {
              foreignKey: 'idUser',
              as: 'fisioterapists'
          });
          this._modelUser.hasOne(this._modelPatient, {
              foreignKey: 'idUser',
              as: 'patients'
          });
          this._modelPatient.belongsTo(this._modelUser, {
            foreignKey: 'idUser',
            as: 'users',
          });
      }

    async readById(resourceId: number): Promise<UsersEntity | undefined> {
        try{
            const userGeneral = await this._database.read(this._modelUser, resourceId, {
              include: ['fisioterapists', 'patients',],
            });
            
            return modelsToEntities(userGeneral);
        } catch(err){
            throw new Error((err as Error).message);
        }
    }

    async readByWhere(email: string): Promise<UsersEntity | undefined> {
        try{
            const user = await this._database.readByWhere(this._modelUser, {
                where: {email: email},
                include: ['patients', 'fisioterapists']
            });
            return modelsToEntities(user, true);
        } catch(err){
            throw new Error((err as Error).message);
        }
    }

    async create(resource: UsersEntity): Promise<UsersEntity> {
        const { userGeneral }  = entitiesToModels(resource);
        
        const userModel = await this._database.create(this._modelUser, userGeneral);
        let response = await modelsToEntities(userModel);

        return response!;
    }

    async createPatientFisioterapist(resource: PatientFisioterapistEntity): Promise<PatientFisioterapistEntity> {
        const userModel = await this._database.create(this._modelPatientFisioterapist, resource);

        return userModel!;
    }

    async deleteById(resourceId: number): Promise<void> {
        const user = await usersService.updateForDelete(resourceId);
        const deleteUser = await this.updateById(user);
        return
    }

    async list(): Promise<UsersEntity[]> {
      const users = this._database.list(this._modelUser);
      return users;
  }

    async updateById(resource: UsersEntity): Promise<UsersEntity | undefined> {
        let userModel = await this._database.read(this._modelUser, Number(resource.idUser), {
            include: [
              'patients',
              'fisioterapists',
            ],
          });
        const { userGeneral, fisioterapistGeneral, patientGeneral } = entitiesToModels(resource);
        userModel = await this._database.update( userModel, userGeneral);
        if(patientGeneral){
            let patientModel = undefined
            if(userModel.patients == null || userModel.patients.idPatient == undefined ){
                patientModel = await this._database.create(this._modelPatient, patientGeneral);
            } else {
                patientModel = await this._database.update(userModel.patients, patientGeneral);
            }
            userModel.patients = patientModel;
        }
        if(fisioterapistGeneral){
            let fisioterapistModel = undefined
            if(userModel.fisioterapists.idFisioterapist == undefined){
                fisioterapistModel = await this._database.create(this._modelFisioterapist, fisioterapistGeneral);
            } else {
                fisioterapistModel = await this._database.update(userModel.fisioterapists, fisioterapistGeneral);
            }
            userModel.fisioterapists = fisioterapistModel;
        }
        let response = modelsToEntities(userModel);
        return response!;
    }

    async listById(idFisioterapist: number): Promise<UsersEntity[]> {
      try{
      const userGeneral = await this._database.listById(this._modelPatientFisioterapist, {
        where: {idFisioterapist: idFisioterapist}
      });
          const users = await this.listPatients(userGeneral);
          return users;
      } catch(err){
          throw new Error((err as Error).message);
      }
      }

      async listPatients(patients: any): Promise<UsersEntity[]> {
        try{
            let users: any[] = [];
          for(let i=0; i<patients.length; i++){
            const userGeneral = await this._database.listById(this._modelPatient, {
                where: {idPatient: patients[i].idPatient},
                include: ['users'],
              }
              );
              users.push(modelsToEntities(userGeneral[0]));
          }
            return users;
        } catch(err){
            throw new Error((err as Error).message);
        }
    }

    async readByPatientFisioterapist(data: any):  Promise<PatientFisioterapistEntity | undefined> {
        try{
            const user = await this._database.readByWhere(this._modelPatientFisioterapist, {
                where: {idPatient: data.userInfo.idPatient, idFisioterapist: data.idFisioterapist},
            });
            return user;
        } catch(err){
            throw new Error((err as Error).message);
        }
    }
}

export default new UsersRepository(
    MySqlDatabase.getInstance(),
    userModel,
    fisioterapistModels,
    patientModels,
    patients_fisioterapistsModelsMysqlDB
    );