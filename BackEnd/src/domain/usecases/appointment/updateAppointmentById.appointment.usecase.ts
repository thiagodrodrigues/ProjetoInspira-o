import AppointmentRepository from "../../../adapters/repositories/appointment.repository";
import { IUseCase } from "../usecase.interface";
import { IAppointmentRepository } from "../../repositories/appointment.repository.interface";
import { IAppointmentEntity } from "../../entities/appointment/appointment.entity";

class UpdateAppointmentByIdUseCase implements IUseCase {
    constructor(private _repository: IAppointmentRepository) {
    }
    async execute(data: {resource: IAppointmentEntity, model: IAppointmentEntity}): Promise<IAppointmentEntity | undefined> {
        return await this._repository.updateById(data.resource, data.model);
    }
}

export default new UpdateAppointmentByIdUseCase(
    AppointmentRepository
);