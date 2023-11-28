import { IUsersEntity } from "../../entities/user/user.entity";
import { IUsersRepository } from "../../repositories/users.repository.interface";
import UsersRepository from "../../../adapters/repositories/";
import { IUseCase } from "../usecase.interface";

class CreateUsersUseCase implements IUseCase {
    constructor(private _repository: IUsersRepository) {
    }
    async execute(data: IUsersEntity): Promise<IUsersEntity | undefined> {
        return await this._repository.create(data);
    }
}

export default new CreateUsersUseCase(
    UsersRepository
);