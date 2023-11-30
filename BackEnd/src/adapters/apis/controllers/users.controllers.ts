import express from 'express';
import createUsersUsecase from '../../../domain/usecases/user/create.users.usecase';
import updateUsersUsecase from '../../../domain/usecases/user/update.users.usecase';
import listUsersUsecase from '../../../domain/usecases/user/list.users.usecase';
import deleteUsersUsecase from '../../../domain/usecases/user/delete.users.usecase';
import loginUsersUsecase from '../../../domain/usecases/user/login.users.usecase';
import readUsersUsecase from '../../../domain/usecases/user/read.users.usecase';
import debug from 'debug';
import constantsConfig from '../../../infrastructure/config/constants.config';
import usersService from '../services/users.service';

const log: debug.IDebugger = debug('app:user-controller');

class UserController {
    async listUser(req: express.Request, res: express.Response){
      try {
        const users = await listUsersUsecase.execute();
        res.status(200).send(users);
      } catch (error) {
        res.status(500).send({
          messages: constantsConfig.STATUS.MESSAGES.STATUS500,
        })
      }
    }

    async getUserById(req: express.Request, res: express.Response) {
      try {
        const user = await readUsersUsecase.execute({
          idUser: Number(req.params.idUser)
        });
        res.status(200).send(user);
      } catch (error) {
        res.status(500).send({
          messages: constantsConfig.STATUS.MESSAGES.STATUS500,
        })
      }
    }
 

    async createUser(req: express.Request, res: express.Response) {
      try {
        const data = await usersService.encryptPassword(req.body);
        const user = await createUsersUsecase.execute(data!);
        log(user);
        res.status(201).send(user);
      } catch (error) {
        res.status(500).send({
          messages: constantsConfig.STATUS.MESSAGES.STATUS500,
        })
      }
    }

    async updateUser(req: express.Request, res: express.Response) {
      try {
        let data = await usersService.encryptPassword(req.body);
        data = {
          ...data!,
          idUser: Number(req.params.idUser)
        }
        const user = await updateUsersUsecase.execute(data!);
        res.status(200).send(user);
      } catch (error) {
        res.status(500).send({
          messages: constantsConfig.STATUS.MESSAGES.STATUS500,
        })
      }
    }

    async removeUser(req: express.Request, res: express.Response) {
      try {
        await deleteUsersUsecase.execute({
          idUser: Number(req.params.idUser)
        });
        res.status(204).send();
      } catch (error) {
        res.status(500).send({
          messages: constantsConfig.STATUS.MESSAGES.STATUS500,
        })
      }
    }

    async login(req: express.Request, res: express.Response){
      try {
        const user = await loginUsersUsecase.execute(req.body);
        if(user){
          res.status(200).send({
              User: {
                  idUser: user.user.idUser,
                  name: user.user.name,
                  email: user.user.email,
              },
              token: user.token
          });
        } else {
          res.status(401).send({
              error: constantsConfig.USERS.MESSAGES.ERROR.USER_UNAUTHENTICATED
          });
        }
      } catch (error) {
        res.status(500).send({
          messages: constantsConfig.STATUS.MESSAGES.STATUS500,
        })
      }
      
  }
}

export default new UserController();