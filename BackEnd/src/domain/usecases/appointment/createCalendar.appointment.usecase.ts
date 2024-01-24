import AppointmentRepository from "../../../adapters/repositories/appointment.repository";
import { IUseCase } from "../usecase.interface";
import { IAppointmentRepository } from "../../repositories/appointment.repository.interface";
import { AppointmentEntity } from "../../entities/appointment/type.appointment.entity";

class CreateCalendarUseCase implements IUseCase {
    constructor(private _repository: IAppointmentRepository) {
    }
    async execute(data: AppointmentEntity): Promise<AppointmentEntity | undefined> {
        return await this._repository.createCalendar(data);
    }
}

export default new CreateCalendarUseCase(
    AppointmentRepository
);