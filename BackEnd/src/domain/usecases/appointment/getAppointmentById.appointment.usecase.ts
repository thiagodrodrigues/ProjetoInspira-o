import AppointmentRepository from "../../../adapters/repositories/appointment.repository";
import { IUseCase } from "../usecase.interface";
import { IAppointmentRepository } from "../../repositories/appointment.repository.interface";
import { IAppointmentEntity } from "../../entities/appointment/appointment.entity";

class GetAppointmentByIdUseCase implements IUseCase {
    constructor(private _repository: IAppointmentRepository) {
    }
    async execute(data: {idAppointment: number}): Promise<IAppointmentEntity | undefined> {
        return await this._repository.readById(data.idAppointment);
    }
}

export default new GetAppointmentByIdUseCase(
    AppointmentRepository
);