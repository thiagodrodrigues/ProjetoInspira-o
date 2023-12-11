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

    if(user.users){
        userGeneral = {
            idUser: user.users.idUser,
            name: user.users.name,
            email: user.users.email,
            professional: user.users.professional
        };
    }

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

    if (user.phone) {
        userGeneral = {
            ...userGeneral,
            patients: {
                idPatient: user.idPatient,
                phone: user.phone,
                birth: user.birth,
                sex: user.sex,
                profession: user.profession,
                medical: user.medical,
                lifestyle: user.lifestyle,
                condition: user.condition,
                comments: user.comments
            }
        } as IPatientEntity;
    }

    if (user.fisioterapists) {
        userGeneral = {
            ...userGeneral,
            fisioterapists: {
                idFisioterapist: user.fisioterapists.idFisioterapist,
                crefito: user.fisioterapists.crefito
            }
        } as IFisioterapistEntity;
    }

    return (userGeneral as UsersEntity);
}