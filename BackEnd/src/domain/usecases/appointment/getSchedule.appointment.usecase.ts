import AppointmentRepository from "../../../adapters/repositories/appointment.repository";
import { IUseCase } from "../usecase.interface";
import { IAppointmentRepository } from "../../repositories/appointment.repository.interface";
import { AppointmentEntity } from "../../entities/appointment/type.appointment.entity";

class GetScheduleUseCase implements IUseCase {
    constructor(private _repository: IAppointmentRepository) {
    }
    async execute(data: Date): Promise<AppointmentEntity[] | undefined> {
        return await this._repository.readByDate(data);
    }
}

export default new GetScheduleUseCase(
    AppointmentRepository
);