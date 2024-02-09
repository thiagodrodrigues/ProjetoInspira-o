import AppointmentRepository from "../../../adapters/repositories/appointment.repository";
import { IUseCase } from "../usecase.interface";
import { IAppointmentRepository } from "../../repositories/appointment.repository.interface";
import { AppointmentEntity } from "../../entities/appointment/type.appointment.entity";

class CreateAppointmentUseCase implements IUseCase {
    constructor(private _repository: IAppointmentRepository) {
    }
    async execute(data: AppointmentEntity): Promise<AppointmentEntity | undefined> {
        try {
            return await this._repository.create(data);
        } catch (error) {
            throw error;
        }
    }
}

export default new CreateAppointmentUseCase(
    AppointmentRepository
);