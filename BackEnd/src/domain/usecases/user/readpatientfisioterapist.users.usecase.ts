import { PatientFisioterapistEntity } from "../../entities/user/patient_fisioterapist.entity";
import { IUsersRepository } from "../../repositories/users.repository.interface";
import UsersRepository from "../../../adapters/repositories/users.repository";
import { IUseCase } from "../usecase.interface";

class ReadPatientFisioterapistUseCase implements IUseCase {
    constructor(private _repository: IUsersRepository) {
    }
    async execute(data: any): Promise<PatientFisioterapistEntity | undefined> {
        return await this._repository.readByPatientFisioterapist(data);
    }
}

export default new ReadPatientFisioterapistUseCase(
    UsersRepository
);