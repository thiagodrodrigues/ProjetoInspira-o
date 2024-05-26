import { Inject, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsersEntity } from './modules/users/entities/user.entity';
import { PatientsEntity } from './modules/patients/entities/patients.entity';
import { AdminsEntity } from './modules/admins/entities/admin.entity';
import { PhysiotherapistsEntity } from './modules/physiotherapists/entities/physiotherapists.entity';
import { faker } from '@faker-js/faker';
import { hashSync } from 'bcrypt';
import * as dayjs from 'dayjs';
import { CalendarsEntity } from './modules/calendar/entities/calendar.entity';
import { AVAILABLE_CALENDAR } from './modules/calendar/calendar.enum';
import { AppointmentEntity } from './modules/appointment/entities/appointment.entity';
import { VariableFieldEntity } from './modules/finances/entities/variableField.entity';
import { CashEntity } from './modules/finances/entities/cash.entity';


let pass = "123456";
let shufflePass = hashSync(pass,10);
enum typeUser { Usuario = 'Usuário', Fisioterapeuta = 'Fisioterapeuta ', Administrador = 'Administrador' }
enum typeSex { Masculino = 'MASCULINO', Feminino = 'FEMININO ', na = 'NÃO INFORMADO' }

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name);
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<UsersEntity>,

    @Inject('PATIENTS_REPOSITORY')
    private patientsRepository: Repository<PatientsEntity>,

    @Inject('ADMIN_REPOSITORY')
    private adminsRepository: Repository<AdminsEntity>,

    @Inject('PHYSIOTHERAPISTS_REPOSITORY')
    private physiotherapistsRepository: Repository<PhysiotherapistsEntity>,

    @Inject('CALENDARS_REPOSITORY')
    private calendarsRepository: Repository<CalendarsEntity>,

    @Inject('APPOINTMENT_REPOSITORY')
    private appointmentRepository: Repository<AppointmentEntity>,

    @Inject('VARIABLE_FIELD_REPOSITORY')
    private variableFieldRepository: Repository<VariableFieldEntity>,

    @Inject('CASH_REPOSITORY')
    private cashRepository: Repository<CashEntity>,
  ) {}

  async seed() {
    try {
      let dbUsers = await this.usersRepository.find();
      let dbPatients = await this.patientsRepository.find();
      let dbAdmins = await this.adminsRepository.find();
      let dbPhysiotherapists = await this.physiotherapistsRepository.find();
      let dbPatientsPhysiotherapists = await this.physiotherapistsRepository.createQueryBuilder()
      .select('*')
      .from('patients_physiotherapists', 'pt')
      .getRawMany();
      let dbCalendars = await this.calendarsRepository.find();
      let dbAppointment = await this.appointmentRepository.find();
      let dbVariableFields = await this.variableFieldRepository.find();
      let dbCash = await this.cashRepository.find();

      if (!dbUsers.length) {
        dbUsers = await this.seedUsers();
        this.logger.log('Users seeded successfully');
      }

      if (!dbPatients.length) {
        dbPatients = await this.seedPatients();
        this.logger.log('Patients seeded successfully');
      }

      if (!dbAdmins.length) {
        dbAdmins = await this.seedAdmins();
        this.logger.log('Admins seeded successfully');
      }

      if (!dbPhysiotherapists.length) {
        dbPhysiotherapists = await this.seedPhysiotherapists();
        this.logger.log('Physiotherapists seeded successfully');
      }

      if (!dbPatientsPhysiotherapists.length) {
        await this.seedPatientsPhysiotherapists();
        this.logger.log('Patients Physiotherapists seeded successfully');
      }

      if (!dbCalendars.length) {
        await this.seedCalendars();
        this.logger.log('Calendars seeded successfully');
      }

      if (!dbAppointment.length) {
        dbAppointment = await this.seedAppointments();
        this.logger.log('Appointments seeded successfully');
      }

      if (!dbVariableFields.length) {
        dbVariableFields = await this.seedVariableFields();
        this.logger.log('VariableFields seeded successfully');
      }

      if (!dbCash.length) {
        dbCash = await this.seedCash();
        this.logger.log('Cash seeded successfully');
      }
    } catch (e) {
      console.log(e)
      this.logger.error(e);
    }
  }

  private async seedUsers(): Promise<UsersEntity[]> {
    const usersToCreate: UsersEntity[] = [];
    for (let i = 1; i <= 20; i++) {
      const user = {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: shufflePass,
        user_type: faker.helpers.enumValue(typeUser)
      };
      usersToCreate.push(user);
    }
    return this.usersRepository.save(usersToCreate);
  }

  private async seedAdmins(): Promise<AdminsEntity[]> {
    let dbUsers = await this.usersRepository.find();
    const adminsToCreate: AdminsEntity[] = [];
    const usersToUpdate: UsersEntity[] = [];
    if(dbUsers.length == 20){
      for (let i = 0; i <= 1; i++) {
        const admin = {
          id: faker.string.uuid(),
          permission: 'Administrador',
          users: dbUsers[i]
        };
        adminsToCreate.push(admin);
        usersToUpdate.push({...dbUsers[i], admin: admin, user_type: 'Administrador'})
      }
    }
    const adminsCreated = await this.adminsRepository.save(adminsToCreate);
    await this.usersRepository.save(usersToUpdate)
    return adminsCreated
  }

  private async seedPatients(): Promise<PatientsEntity[]> {
    const patientsToCreate: PatientsEntity[] = [];
    const usersToUpdate: UsersEntity[] = [];
    let dbUsers = await this.usersRepository.find();
    if(dbUsers.length == 20){
      for (let i = 2; i <= 16; i++) {
        const patients = {
          id: faker.string.uuid(),
          phone: faker.helpers.fromRegExp('+55 (31)-9[0-9]{4}-[0-9]{4}'),
          birth: dayjs(faker.date.birthdate({ min: 18, max: 65, mode: 'age' })).format("YYYY-MM-DD"),
          sex: faker.helpers.enumValue(typeSex),
          profession: faker.person.jobType(),
          medical: faker.lorem.sentence({ min: 5, max: 15 }),
          lifestyle: faker.lorem.sentence({ min: 5, max: 15 }),
          condition: faker.lorem.sentence({ min: 5, max: 15 }),
          comments: faker.lorem.sentence({ min: 5, max: 15 }),
          users: dbUsers[i],
          physiotherapists: []
        };
        patientsToCreate.push(patients);
        usersToUpdate.push({...dbUsers[i], patient: patients, user_type: 'Usuário'})
      }
    }

    const patientsCreated = await this.patientsRepository.save(patientsToCreate);
    await this.usersRepository.save(usersToUpdate);
    return patientsCreated
  }

  private async seedPhysiotherapists(): Promise<PhysiotherapistsEntity[]> {
    let dbUsers = await this.usersRepository.find();
    const physiotherapistsToCreate: PhysiotherapistsEntity[] = [];
    const usersToUpdate: UsersEntity[] = [];
    if(dbUsers.length == 20){
      for (let i = 17; i <= 19; i++) {
        const physiotherapist = {
          id: faker.string.uuid(),
          crefito: faker.helpers.fromRegExp('CREFITO-4/[0-9]{6}F'),
          users: dbUsers[i],
          patients: []
        };
        physiotherapistsToCreate.push(physiotherapist);
        usersToUpdate.push({...dbUsers[i], physiotherapist: physiotherapist, user_type: 'Fisioterapeuta'})
      }
    }

    const physiotherapistsCreated = await this.physiotherapistsRepository.save(physiotherapistsToCreate);
    await this.usersRepository.save(usersToUpdate)
    return physiotherapistsCreated
  }

  
  private async seedPatientsPhysiotherapists(){
    let dbPhysiotherapists = await this.physiotherapistsRepository.find( {
      relations: ['patients'],
    });
    let dbPatients = await this.patientsRepository.find( {
      relations: ['physiotherapists'],
    });
    for (let i = 0; i < dbPatients.length; i++) {
      let totalPhysiotherapists = dbPhysiotherapists.length;
      let numberPhysiotherapistsByPatients = faker.helpers.rangeToNumber({min: 1, max: totalPhysiotherapists})
      for(let index = 0; index < numberPhysiotherapistsByPatients; index++){
        dbPatients[i].physiotherapists.push(dbPhysiotherapists[index])
        dbPhysiotherapists[index].patients.push(dbPatients[i])
      }
    }
    

    await this.patientsRepository.save(dbPatients)
    await this.physiotherapistsRepository.save(dbPhysiotherapists);
    return
  }

  private async seedCalendars(): Promise<CalendarsEntity[]> {
    const calendarsToCreate: CalendarsEntity[] = [];
    let dbPhysiotherapists = await this.physiotherapistsRepository.find();
    for (let i = 0; i < dbPhysiotherapists.length; i++) {
      for(let index = 0; index < 10; index++){
        const calendar = {
          id: faker.string.uuid(),
          date: dayjs(faker.date.future()).format("YYYY-MM-DD"),
          time: `1${index}:00`,
          duration: '60',
          available: faker.helpers.enumValue(AVAILABLE_CALENDAR),
          physiotherapistId: dbPhysiotherapists[i].id
        };
        calendarsToCreate.push(calendar);
      }
    }
    return await this.calendarsRepository.save(calendarsToCreate);
  }

  private async seedAppointments(): Promise<AppointmentEntity[]> {
    const appointmentsToCreate: AppointmentEntity[] = [];
    let dbCalendars = await this.calendarsRepository.find({
      where: [
        {
        available: AVAILABLE_CALENDAR.COMPLETED
        },
        {
        available: AVAILABLE_CALENDAR.MISSING
        },
        {
        available: AVAILABLE_CALENDAR.SCHEDULED
        },
      ]
    });
    let dbPhysiotherapists = await this.physiotherapistsRepository.find();
    const maxPhysiotherapists = dbPhysiotherapists.length -1;
    let dbPatients = await this.patientsRepository.find();
    const maxPatients = dbPatients.length -1;
    for (let i = 0; i < dbCalendars.length; i++) {
      let numberPhysiotherapists = faker.helpers.rangeToNumber({min: 0, max: maxPhysiotherapists})
      let numberPatients = faker.helpers.rangeToNumber({min: 0, max: maxPatients})
      const appointment = {
        id: faker.string.uuid(),
        calendar: dbCalendars[i],
        physiotherapistId: dbPhysiotherapists[numberPhysiotherapists].id,
        patientId: dbPatients[numberPatients].id,
        activies: faker.lorem.sentence({ min: 5, max: 15 }),
        notes: faker.lorem.sentence({ min: 5, max: 15 }),
        comments: faker.lorem.sentence({ min: 5, max: 15 }),
      };
      appointmentsToCreate.push(appointment);
    }
    return await this.appointmentRepository.save(appointmentsToCreate);
  }

  private async seedVariableFields(): Promise<VariableFieldEntity[]> {
    const variableFieldsToCreate: VariableFieldEntity[] = [];
    let variableField = {
      id: faker.string.uuid(),
      field: 'Status',
      value: 'A vencer',
    };
    variableFieldsToCreate.push(variableField);
    variableField = {
      id: faker.string.uuid(),
      field: 'Status',
      value: 'Paga',
    };
    variableFieldsToCreate.push(variableField);
    variableField = {
      id: faker.string.uuid(),
      field: 'Status',
      value: 'Atrasada',
    };
    variableFieldsToCreate.push(variableField);
    variableField = {
      id: faker.string.uuid(),
      field: 'Status',
      value: 'Outros',
    };
    variableFieldsToCreate.push(variableField);
    variableField = {
      id: faker.string.uuid(),
      field: 'Receita',
      value: 'Outros',
    };
    variableFieldsToCreate.push(variableField);
    variableField = {
      id: faker.string.uuid(),
      field: 'Despesa',
      value: 'Outros',
    };
    variableFieldsToCreate.push(variableField);
    variableField = {
      id: faker.string.uuid(),
      field: 'Transação',
      value: 'Outros',
    };
    variableFieldsToCreate.push(variableField);
    return await this.variableFieldRepository.save(variableFieldsToCreate);
  }

  private async seedCash(): Promise<CashEntity[]> {
    const cashToCreate: CashEntity[] = [];
    let cashField = {
      id: faker.string.uuid(),
      wallet: 'Principal',
      balance: 0,
    };
    cashToCreate.push(cashField);
    return await this.cashRepository.save(cashToCreate);
  }
}