import { IUsersEntity } from '../../../domain/entities/user/user.entity';
import bcrypt from 'bcrypt';
import constantsConfig from '../../../infrastructure/config/constants.config';
import debug from 'debug';

class UserService {
  encryptPassword(data: IUsersEntity){
    try {
      if(data.password){
        let shufflePass = bcrypt.hashSync(data.password!,10);
        let dataSend = {
          ...data,
          password: shufflePass,
        }
        return dataSend
      } else {
        return data
      }

    } catch (error) {
    }
  }

  updateForDelete(idUser: number){
    let response = {
      idUser: idUser,
      name: `Usuário deletado número ${idUser}`,
      email: `usuáriodeletado${idUser}@inspiracaofisioterapia.com`,
      password: bcrypt.hashSync(String(idUser),10),
      phone: `${idUser}`,
      birth: new Date,
      profession: "USUÁRIO DELETADO",
      medical: "USUÁRIO DELETADO",
      comments: "USUÁRIO DELETADO",
      professional: "Usuário"
    }
    return response
  } 
}


export default new UserService();