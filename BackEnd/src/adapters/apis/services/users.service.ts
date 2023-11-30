import { IUsersEntity } from '../../../domain/entities/user/user.entity';
import bcrypt from 'bcrypt';
import constantsConfig from '../../../infrastructure/config/constants.config';
import debug from 'debug';

class UserService {
  async encryptPassword(data: IUsersEntity){
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
}


export default new UserService();