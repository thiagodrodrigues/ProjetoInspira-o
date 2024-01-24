import AppointmentRepository from "../../../adapters/repositories/appointment.repository";
import { IUseCase } from "../usecase.interface";
import { IAppointmentRepository } from "../../repositories/appointment.repository.interface";
import { ICalendarEntity } from "../../entities/appointment/calendar.entity.ts";

class CheckCalendarUseCase implements IUseCase {
    constructor(private _repository: IAppointmentRepository) {
    }
    async execute(data: ICalendarEntity): Promise<ICalendarEntity | undefined> {
        return await this._repository.checkCalendar(data);
    }
}

export default new CheckCalendarUseCase(
    AppointmentRepository
);