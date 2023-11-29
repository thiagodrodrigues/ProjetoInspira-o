import { IUsersRepository } from "../../repositories/users.repository.interface";
import { IUseCase } from "../usecase.interface";
import UsersRepository from "../../../adapters/repositories/users.repository";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class ReadEmailUseCaseUseCase implements IUseCase {
    constructor(private _repository: IUsersRepository){
    }

    async execute(data: { email: string }) {
        const user = await this._repository.readByWhere(data.email);
        if(user){
            return user
        }
        return;
    }
}

export default new ReadEmailUseCaseUseCase(
    UsersRepository
);