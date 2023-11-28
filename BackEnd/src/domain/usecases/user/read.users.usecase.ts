import { UsersEntity } from "../../entities/user/type.users.entity";
import { IUsersRepository } from "../../repositories/users.repository.interface";
import UsersRepository from "../../../adapters/repositories/users.repository";
import { IUseCase } from "../usecase.interface";

class ReadUsersUseCase implements IUseCase {
    constructor(private _repository: IUsersRepository) {
    }
    async execute(data: { idUser: number }): Promise<UsersEntity | undefined> {
        return await this._repository.readById(data.idUser);
    }
}

export default new ReadUsersUseCase(
    UsersRepository
);