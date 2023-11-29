import express from 'express';
import debug from 'debug';
import constantsConfig from '../../../infrastructure/config/constants.config';
import readUsersUsecase from '../../../domain/usecases/user/read.users.usecase';
import readEmailUsersUsecase from '../../../domain/usecases/user/readEmail.users.usecase';

const log: debug.IDebugger = debug('app:user-middleware');

class UserMiddleware {
    
    async validateUserRepeated(req: express.Request, res: express.Response, next: express.NextFunction) {
        let dataWhere: string = req.body.email;
        let idUser: number = Number(req.params.idUser);
        const user = await readEmailUsersUsecase.execute({
            email: dataWhere
        });
        if(!user){
            next();
        } else if(dataWhere == user.email && idUser == user.idUser) {
            next();
        } else {
            res.status(409).send({error: constantsConfig.USERS.MESSAGES.ERROR.USER_ALREADY_EXISTS.replace('{USER_ID}', String(dataWhere))});
        }
    }

    async validateUserExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const user = await readUsersUsecase.execute({
            idUser: Number(req.params.idUser)
        });
        if(user) {
            next();
        } else{
            res.status(400).send({error: constantsConfig.USERS.MESSAGES.ERROR.USER_NOT_FOUND.replace('{USER_ID}', String(req.params.idUser))})
        }
    }

    async validateRequiredNameBodyFields(req: express.Request, res: express.Response, next: express.NextFunction){
        if(req.body.name) {
                next();
        } else {
            res.status(400).send({error: constantsConfig.USERS.MESSAGES.ERROR.VOID_NAME});
        }
    }

    async validateRequiredEmailBodyFields(req: express.Request, res: express.Response, next: express.NextFunction){
        if(req.body.email) {
                next();
        } else {
            res.status(400).send({error: constantsConfig.USERS.MESSAGES.ERROR.VOID_EMAIL});
        }
    }

    async validateRequiredPasswordBodyFields(req: express.Request, res: express.Response, next: express.NextFunction){
        if(req.body.password) {
                next();
        } else {
            res.status(400).send({error: constantsConfig.USERS.MESSAGES.ERROR.VOID_PASSWORD});
        }
    }

    async validateRequiredBirthDateBodyFields(req: express.Request, res: express.Response, next: express.NextFunction){
        if(req.body.birth) {
                next();
        } else {
            res.status(400).send({error: constantsConfig.USERS.MESSAGES.ERROR.VOID_BIRTHDATE});
        }
    }

    async validateStatusTrue(req: express.Request, res: express.Response, next: express.NextFunction){
        const status = await req.body.status
        if(status === true){
            next();
        } else {
            res.status(400).send({error: constantsConfig.USERS.MESSAGES.ERROR.STATUS_NOT_TRUE})
        }
    }

}

export default new UserMiddleware();