import { IDatabaseModel } from "../../infrastructure/persistence/database.model.interface";
import { UsersEntity } from "../../domain/entities/user/type.users.entity";
import { MySqlDatabase } from "../../infrastructure/persistence/mysql/mysql.database";
import { IUsersRepository } from "../../domain/repositories/users.repository.interface";
import * as Sequelize from 'sequelize'
import userModel from '../../infrastructure/persistence/mysql/models/user.models.mysql.DB';
import fisioterapistModels from "../../infrastructure/persistence/mysql/models/fisioterapist.models.mysql.DB";
import patientModels from "../../infrastructure/persistence/mysql/models/patient.models.mysql.DB";
import modelsToEntities from '../../infrastructure/persistence/mysql/helpers/users.modelstoEntities.mysql.DB';
import entitiesToModels from '../../infrastructure/persistence/mysql/helpers/users.entitiestoModel.mysql.DB';


export class UsersRepository implements IUsersRepository {
    constructor(
        private _database: IDatabaseModel, 
        private _modelUser: Sequelize.ModelCtor<Sequelize.Model<any, any>>,
        private _modelFisioterapist: Sequelize.ModelCtor<Sequelize.Model<any, any>>,
        private _modelPatient: Sequelize.ModelCtor<Sequelize.Model<any, any>>,
        ){
          this._modelUser.hasOne(this._modelFisioterapist, {
              foreignKey: 'idUser',
              as: 'fisioterapists'
          });
  
          this._modelUser.hasOne(this._modelPatient, {
              foreignKey: 'idUser',
              as: 'patients'
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
                email: email
            });
            return modelsToEntities(user);
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

    async deleteById(resourceId: number): Promise<void> {
        await this._database.delete(this._modelUser, { idUser: resourceId });
    }

    async list(): Promise<UsersEntity[]> {
      const users = this._database.list(this._modelUser);
      return users;
  }

    async updateById(resource: UsersEntity): Promise<UsersEntity | undefined> {
        let userModel = await this._database.read(this._modelUser, Number(resource.idUser));
        const { userGeneral } = entitiesToModels(resource);
        await this._database.update(userModel, userGeneral);

        return resource;
    }

    async listById(idUser: number): Promise<UsersEntity[]> {
      try{
      const userGeneral = await this._database.listById(this._modelUser, {
          idUser: idUser
      });
          const users = userGeneral.map(modelsToEntities);
          return users;
      } catch(err){
          throw new Error((err as Error).message);
      }
      }
}

export default new UsersRepository(
    MySqlDatabase.getInstance(),
    userModel,
    fisioterapistModels,
    patientModels
    );