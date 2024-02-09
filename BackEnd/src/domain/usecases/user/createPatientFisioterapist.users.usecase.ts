import { PatientFisioterapistEntity } from "../../entities/user/patient_fisioterapist.entity";
import { IUsersRepository } from "../../repositories/users.repository.interface";
import UsersRepository from "../../../adapters/repositories/users.repository";
import { IUseCase } from "../usecase.interface";

class CreatePatientFisioterapistUseCase implements IUseCase {
    constructor(private _repository: IUsersRepository) {
    }
    async execute(data: PatientFisioterapistEntity): Promise<PatientFisioterapistEntity | undefined> {
        return await this._repository.createPatientFisioterapist(data);
    }
}

export default new CreatePatientFisioterapistUseCase(
    UsersRepository
);