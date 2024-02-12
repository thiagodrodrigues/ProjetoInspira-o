import AppointmentRepository from "../../../adapters/repositories/appointment.repository";
import { IUseCase } from "../usecase.interface";
import { IAppointmentRepository } from "../../repositories/appointment.repository.interface";
import { AppointmentEntity } from "../../entities/appointment/type.appointment.entity";

class GetAppointmentPatientUseCase implements IUseCase {
    constructor(private _repository: IAppointmentRepository) {
    }
    async execute(data: {idPatient: number, status?: any}): Promise<AppointmentEntity[] | undefined> {
        return await this._repository.listAppointments(data.idPatient, data.status);
    }
}

export default new GetAppointmentPatientUseCase(
    AppointmentRepository
);