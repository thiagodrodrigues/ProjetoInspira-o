import { UsersEntity } from "../../../../domain/entities/user/type.users.entity";
import { IFisioterapistEntity } from "../../../../domain/entities/user/fisioterapist.entity";
import { IPatientEntity } from "../../../../domain/entities/user/patient.entity";
import { IUsersEntity } from "../../../../domain/entities/user/user.entity";

export default function (user: any, typePassword?: boolean): UsersEntity | undefined {
    if(!user)
        return;
    let userGeneral: IUsersEntity = {
        idUser: user.idUser,
        name: user.name,
        email: user.email,
        professional: user.professional
    };

    if (typePassword) {
        userGeneral = {
            ...userGeneral,
            password: user.password,
        }
    }

    if (user.patients) {
        userGeneral = {
            ...userGeneral,
            idPatient: user.patients.idPatient,
            phone: user.patients.phone,
            birth: user.patients.birth,
            sex: user.patients.sex,
            profession: user.patients.profession,
            medical: user.patients.medical,
            lifestyle: user.patients.lifestyle,
            condition: user.patients.condition,
            comments: user.patients.comments
        } as IPatientEntity;
    }

    if (user.fisioterapists) {
        userGeneral = {
            ...userGeneral,
            idFisioterapist: user.fisioterapists.idFisioterapist,
            crefito: user.fisioterapists.crefito
        } as IFisioterapistEntity;
    }

    return (userGeneral as UsersEntity);
}