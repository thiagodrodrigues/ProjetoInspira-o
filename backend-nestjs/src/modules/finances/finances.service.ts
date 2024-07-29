import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';
import { Between, Like, Repository } from 'typeorm';
import { FinanceEntity } from './entities/finance.entity';
import { CashEntity } from './entities/cash.entity';
import { FinancesUtils } from './finances.utils';
import { FINANCES_ERRORS } from 'src/shared/helpers/errors/finances-errors.helpers';
import { VariableFieldEntity } from './entities/variableField.entity';
import { STATUS_TRANSACTION, TYPE_FINCANCES, TYPE_OWNER } from 'src/shared/constants/financesType.appointment.enum';
import { FiltersPaginationDto } from 'src/shared/dto/filters-pagination.dto';
import * as dayjs from 'dayjs';
import { CreateCashDto } from './dto/create-cash-finance.dto';
import { USERS_ERRORS } from 'src/shared/helpers/errors/users-errors.helpers';

@Injectable()
export class FinancesService {
  constructor(
    @Inject('FINANCES_REPOSITORY')
    private financesRepository: Repository<FinanceEntity>,

    @Inject('CASH_REPOSITORY')
    private cashRepository: Repository<CashEntity>,

    @Inject('VARIABLE_FIELD_REPOSITORY')
    private variableFieldRepository: Repository<VariableFieldEntity>,
    private financesUtils: FinancesUtils,
  ) {}

  async createCash(createCashDto: CreateCashDto) {
    try {
      if(!createCashDto.balance){
        createCashDto.balance = 0.00
      }
      const cash_create = this.cashRepository.create(createCashDto);
      const cash_saved = await this.cashRepository.save(cash_create);
      return cash_saved
    } catch (e) {
      this.financesUtils.returnErrorContactCreate(e);
    }
  }

  async create(createFinanceDto: CreateFinanceDto) {
    try {
      const foundCash: CashEntity | null = await this.cashRepository.findOne({
        where: {
          id: createFinanceDto.cash.id
        },
      });
      if (!foundCash) {
        throw new BadRequestException(FINANCES_ERRORS.cashNotExixts);
      }
      if(createFinanceDto.financeCategory == TYPE_FINCANCES.OTHER){
        const field_create = this.variableFieldRepository.create({
          field: createFinanceDto.financeType,
          value: createFinanceDto.financeCategoryValue
        });
        const field_saved = await this.variableFieldRepository.save(field_create);
        createFinanceDto.financeCategory = createFinanceDto.financeCategoryValue
      }
      if(createFinanceDto.transaction == TYPE_FINCANCES.OTHER){
        const field_create = this.variableFieldRepository.create({
          field: TYPE_FINCANCES.TRANSACTION,
          value: createFinanceDto.transactionValue
        });
        const field_saved = await this.variableFieldRepository.save(field_create);
        createFinanceDto.transaction = createFinanceDto.transactionValue
      }
      if(createFinanceDto.status == TYPE_FINCANCES.OTHER){
        const field_create = this.variableFieldRepository.create({
          field: TYPE_FINCANCES.STATUS,
          value: createFinanceDto.statusValue
        });
        const field_saved = await this.variableFieldRepository.save(field_create);
        createFinanceDto.status = createFinanceDto.statusValue
      }
      if(createFinanceDto.status == STATUS_TRANSACTION.PAY){
        if(createFinanceDto.financeType == TYPE_FINCANCES.REVENUE){
          foundCash.balance = Number(foundCash.balance) + Number(createFinanceDto.value);
        } else if(createFinanceDto.financeType == TYPE_FINCANCES.EXPENSES){
          foundCash.balance = Number(foundCash.balance) - Number(createFinanceDto.value);
        }
        const finances_create = this.financesRepository.create(createFinanceDto);
        const finances_saved = await this.financesRepository.save(finances_create);
        const cash_saved = await this.cashRepository.save(foundCash);
        return {
          finances: finances_saved,
          cash: cash_saved
        }
      } else {
        const finances_create = this.financesRepository.create(createFinanceDto);
        const finances_saved = await this.financesRepository.save(finances_create);
        const cash_saved = await this.cashRepository.save(foundCash);
        return {
          finances: finances_saved,
          cash: cash_saved
        }
      }
    } catch (e) {
      this.financesUtils.returnErrorContactCreate(e);
    }
  }

  async findAllCash(decoded: any): Promise<any> {
    try {
      if(typeof decoded == `string`){
        throw new UnauthorizedException(USERS_ERRORS.userUnauthorized)
      }
      let totalCashs = []
      if(decoded.owner){
        const foundCashOwner: CashEntity[] | null = await this.cashRepository.find({
          where: {
            owner: TYPE_OWNER.OWNER
          }
        });
        for(let i=0; i<foundCashOwner.length; i++){
          totalCashs.push(foundCashOwner[i])
        }
      }
      const foundCashPhysiotherapist: CashEntity[] | null = await this.cashRepository.find({
        where: {
          owner: TYPE_OWNER.PHYSIOTHERAPIST,
          id_owner: decoded.id
        }
      });
      for(let i=0; i<foundCashPhysiotherapist.length; i++){
        totalCashs.push(foundCashPhysiotherapist[i])
      }
      if (!foundCashPhysiotherapist) {
        throw new BadRequestException(FINANCES_ERRORS.cashNotExixts);
      }
      return totalCashs;
    } catch (e) {
      console.log(e)
      return this.financesUtils.returnErrorContactCreate(e);
    }
  }

  async findAll(filtersDTO: FiltersPaginationDto, idCash: string): Promise<any> {
    try {
      const foundCash: CashEntity | null = await this.cashRepository.findOne({
        where: {
          id: idCash
        },
      });
      if (!foundCash) {
        throw new BadRequestException(FINANCES_ERRORS.cashNotExixts);
      }
      const { pageSize, pageIndex } = filtersDTO;
      let { filter, startDate, endDate, financeTransaction, financeType, status } = filtersDTO;

      if (!filter) {
        filter = '';
      }
      if (!startDate) {
        let nowDate = dayjs().format('YYYY-MM-DD')
        if(Number(nowDate.split('-')[2])<16){
          nowDate = dayjs(nowDate).subtract(1, 'month').format('YYYY-MM-DD')
          startDate = `${nowDate.split('-')[0]}-${nowDate.split('-')[1]}-01`;
        } else {
          startDate = `${nowDate.split('-')[0]}-${nowDate.split('-')[1]}-01`;
        }
      }
      if (!endDate) {
        endDate = dayjs(startDate).add(2, 'month').format('YYYY-MM-DD');
      }
      if (!financeTransaction) {
        financeTransaction = "";
      }
      if (!financeType) {
        financeType = "";
      }
      if (!status) {
        status = "";
      }
      endDate = dayjs(endDate).add(12, 'hours').format('YYYY-MM-DDTHH:mm:ss')
        const  financesFiltered =
        await this.financesRepository.find({
          where: [
          {
            financeDate: Between(new Date(startDate), new Date(endDate)),
            financeType: Like(`%${financeType}%`),
            transaction: Like(`%${financeTransaction}%`),
            financeDescription: Like(`%${filter}%`),
            status: Like(`%${status}%`),
            cash: {
              id: idCash
            }
          },
        ],
          order: {
            created_at: 'DESC',
          },
          skip: pageIndex * pageSize || 0,
          take: pageSize || 100,
        });
        for(let i=0; i<financesFiltered.length; i++){
          if(dayjs(financesFiltered[i].financeDate).isBefore(dayjs()) && financesFiltered[i].status == STATUS_TRANSACTION.PENDING){
            await this.financesRepository.save({
              ...financesFiltered[i],
              status: STATUS_TRANSACTION.LATE
            })
          }
        }
      return {
        finances: financesFiltered,
        cash: foundCash
      };
    } catch (e) {
      console.log(e)
      return this.financesUtils.returnErrorContactCreate(e);
    }
  }

  async findAllFields(fields: string): Promise<any> {
    try {
      const  fieldsFound =
        await this.variableFieldRepository.find({
          where: {
            field: fields
          },
          order: {
            value: 'ASC',
          },
        });
      return fieldsFound;
    } catch (e) {
      console.log(e)
      return this.financesUtils.returnErrorContactCreate(e);
    }
  }

  async findOneFinance(id: string) {
    try {
      const foundFinance: FinanceEntity | null = await this.financesRepository.findOne({
        where: {
          id: id
        },
      });
      if (!foundFinance) {
        throw new BadRequestException(FINANCES_ERRORS.financeNotExixts);
      }
      return foundFinance
    } catch (e) {
      this.financesUtils.returnErrorContactCreate(e);
    }
  }

  async update(id: string, updateFinanceDto: UpdateFinanceDto) {
    try {
      const foundFinance: FinanceEntity | null = await this.financesRepository.findOne({
        where: {
          id: id,
        },
      });
      if (!foundFinance) {
        throw new BadRequestException(FINANCES_ERRORS.financeNotExixts);
      }
      const foundCash: CashEntity | null = await this.cashRepository.findOne({
        where: {
          id: updateFinanceDto.cash.id
        },
      });
      if (!foundCash) {
        throw new BadRequestException(FINANCES_ERRORS.cashNotExixts);
      }
      if(updateFinanceDto.financeCategory == TYPE_FINCANCES.OTHER){
        const field_create = this.variableFieldRepository.create({
          field: updateFinanceDto.financeType,
          value: updateFinanceDto.financeCategoryValue
        });
        const field_saved = await this.variableFieldRepository.save(field_create);
      }
      if(updateFinanceDto.transaction == TYPE_FINCANCES.OTHER){
        const field_create = this.variableFieldRepository.create({
          field: TYPE_FINCANCES.TRANSACTION,
          value: updateFinanceDto.transactionValue
        });
        const field_saved = await this.variableFieldRepository.save(field_create);
      }
      if(updateFinanceDto.status == TYPE_FINCANCES.OTHER){
        const field_create = this.variableFieldRepository.create({
          field: TYPE_FINCANCES.STATUS,
          value: updateFinanceDto.statusValue
        });
        const field_saved = await this.variableFieldRepository.save(field_create);
      }
      if(updateFinanceDto.status == STATUS_TRANSACTION.PAY && foundFinance.status == STATUS_TRANSACTION.PAY){
        if(updateFinanceDto.financeType == TYPE_FINCANCES.REVENUE){
          foundCash.balance = Number(foundCash.balance) - Number(foundFinance.value) + Number(updateFinanceDto.value);
        } else if(updateFinanceDto.financeType == TYPE_FINCANCES.EXPENSES){
          foundCash.balance = Number(foundCash.balance) + Number(foundFinance.value) - Number(updateFinanceDto.value);
        }
        const finances_create = this.financesRepository.create(updateFinanceDto);
        const finances_saved = await this.financesRepository.save(finances_create);
        const cash_saved = await this.cashRepository.save(foundCash);
        return {
          finances: finances_saved,
          cash: cash_saved
        }
      } else if(updateFinanceDto.status == STATUS_TRANSACTION.PENDING && foundFinance.status == STATUS_TRANSACTION.PAY){
        if(updateFinanceDto.financeType == TYPE_FINCANCES.REVENUE){
          foundCash.balance = Number(foundCash.balance) - Number(foundFinance.value);
        } else if(updateFinanceDto.financeType == TYPE_FINCANCES.EXPENSES){
          foundCash.balance = Number(foundCash.balance) + Number(foundFinance.value);
        }
        const finances_create = this.financesRepository.create(updateFinanceDto);
        const finances_saved = await this.financesRepository.save(finances_create);
        const cash_saved = await this.cashRepository.save(foundCash);
        return {
          finances: finances_saved,
          cash: cash_saved
        }
      } else if(updateFinanceDto.status == STATUS_TRANSACTION.PAY && foundFinance.status !== STATUS_TRANSACTION.PAY){
        if(updateFinanceDto.financeType == TYPE_FINCANCES.REVENUE){
          foundCash.balance = Number(foundCash.balance) + Number(foundFinance.value);
        } else if(updateFinanceDto.financeType == TYPE_FINCANCES.EXPENSES){
          foundCash.balance = Number(foundCash.balance) - Number(foundFinance.value);
        }
        const finances_create = this.financesRepository.create(updateFinanceDto);
        const finances_saved = await this.financesRepository.save(finances_create);
        const cash_saved = await this.cashRepository.save(foundCash);
        return {
          finances: finances_saved,
          cash: cash_saved
        }
      } else {
        const finances_create = this.financesRepository.create(updateFinanceDto);
        const finances_saved = await this.financesRepository.save(finances_create);
        const cash_saved = await this.cashRepository.save(foundCash);
        return {
          finances: finances_saved,
          cash: cash_saved
        }
      }
    }  catch (e) {
      console.log("8888888888888", e)
      this.financesUtils.returnErrorContactCreate(e);
    }
  }

  async remove(id: string) {
    try {
      console.log(id)
      const financeFound = await this.financesRepository.findOne({
        where: {id: id},
        relations: ["cash"]
      });
      if (!financeFound) {
        throw new NotFoundException(FINANCES_ERRORS.financeNotExixts);
      }
      const foundCash: CashEntity | null = await this.cashRepository.findOne({
        where: {
          id: financeFound.cash.id
        },
      });
      if (!foundCash) {
        throw new BadRequestException(FINANCES_ERRORS.cashNotExixts);
      }
      if(financeFound.status == STATUS_TRANSACTION.PAY){
        if(financeFound.financeType == TYPE_FINCANCES.REVENUE){
          foundCash.balance = Number(foundCash.balance) - Number(financeFound.value);
        } else if(financeFound.financeType == TYPE_FINCANCES.EXPENSES){
          foundCash.balance = Number(foundCash.balance) + Number(financeFound.value);
        }
      }
      await this.financesRepository.softRemove(financeFound);
      const cash_saved = await this.cashRepository.save(foundCash);
      return;
    } catch (e) {
      console.log(e)
      return this.financesUtils.returnErrorContactCreate(e);
    }
  }
}
