import { UsersEntity } from "../../../../domain/entities/user/type.users.entity";
import { IFisioterapistEntity } from "../../../../domain/entities/user/fisioterapist.entity";
import { IPatientEntity } from "../../../../domain/entities/user/patient.entity";
import { IUsersEntity } from "../../../../domain/entities/user/user.entity";

export default function (user: any): UsersEntity | undefined {
    if(!user)
        return;

    let userGeneral: IUsersEntity = {
        idUser: user.idUser,
        name: user.name,
        email: user.email,
        password: user.password,
        professional: user.professional
    };

    if (user.phone) {
        userGeneral = {
            ...userGeneral,
            idPatient: user.idPatient,
            phone: user.phone,
            birth: user.birth,
            sex: user.sex,
            profession: user.profession,
            medical: user.medical,
            lifestyle: user.lifestyle,
            condition: user.condition,
            comments: user.comments
        } as IPatientEntity;
    }

    if (user.crefito) {
        userGeneral = {
            ...userGeneral,
            idFisioterapist: user.idFisioterapist,
            crefito: user.crefito
        } as IFisioterapistEntity;
    }

    return (userGeneral as UsersEntity);
}