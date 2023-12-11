import { UsersEntity } from "../../entities/user/type.users.entity";
import { IUsersRepository } from "../../repositories/users.repository.interface";
import UsersRepository from "../../../adapters/repositories/users.repository";
import { IUseCase } from "../usecase.interface";

class ListUsersUseCase implements IUseCase {
    constructor(private _repository: IUsersRepository) {
    }
    async execute(idFisioterapist: number): Promise<UsersEntity[] | undefined> {
        return await this._repository.listById(idFisioterapist);
    }
}

export default new ListUsersUseCase(
    UsersRepository
);

