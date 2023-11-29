import { UsersEntity } from "../../../../domain/entities/user/type.users.entity";

export default function (user: UsersEntity) {
    const userGeneral = {
        idUser:  user.idUser,
        name: user.name,
        email: user.email,
        password: user.password,
        professional: "Usuário"
    };
    
    let patientGeneral = undefined;
    if('phone' in user){
        patientGeneral = {
            idPatient: undefined,
            phone: user.phone,
            birth: user.birth,
            sex: user.sex,
            profession: user.profession,
            medical: user.medical,
            lifestyle: user.lifestyle,
            condition: user.condition,
            comments: user.comments
        }
    }

    let fisioterapistGeneral = undefined;
    if('crefito' in user){
        fisioterapistGeneral = {
            idFisioterapist: undefined,
            crefito: user.crefito
        }
    }
    
    return {
        userGeneral: userGeneral,
        patientGeneral: patientGeneral,
        fisioterapistGeneral: fisioterapistGeneral,
    };
}