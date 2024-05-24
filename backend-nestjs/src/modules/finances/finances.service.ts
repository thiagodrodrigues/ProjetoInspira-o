import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';
import { Between, Repository } from 'typeorm';
import { FinanceEntity } from './entities/finance.entity';
import { CashEntity } from './entities/cash.entity';
import { FinancesUtils } from './finances.utils';
import { FINANCES_ERRORS } from 'src/shared/helpers/errors/finances-errors.helpers';
import { VariableFieldEntity } from './entities/variableField.entity';
import { STATUS_TRANSACTION, TYPE_FINCANCES } from 'src/shared/constants/financesType.appointment.enum';
import { FiltersPaginationDto } from 'src/shared/dto/filters-pagination.dto';
import dayjs from 'dayjs';

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
      }
      if(createFinanceDto.transaction == TYPE_FINCANCES.OTHER){
        const field_create = this.variableFieldRepository.create({
          field: TYPE_FINCANCES.TRANSACTION,
          value: createFinanceDto.transactionValue
        });
        const field_saved = await this.variableFieldRepository.save(field_create);
      }
      if(createFinanceDto.status == TYPE_FINCANCES.OTHER){
        const field_create = this.variableFieldRepository.create({
          field: TYPE_FINCANCES.STATUS,
          value: createFinanceDto.statusValue
        });
        const field_saved = await this.variableFieldRepository.save(field_create);
      }
      if(createFinanceDto.status == STATUS_TRANSACTION.PAY){
        foundCash.balance = foundCash.balance + createFinanceDto.value;
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

  async findAll(filtersDTO: FiltersPaginationDto): Promise<any> {
    try {
      const { pageSize, pageIndex } = filtersDTO;
      let { filter, startDate, endDate } = filtersDTO;

      if (!filter) {
        filter = '';
      }
      if (!startDate) {
        startDate = `${dayjs().year()}-${dayjs().month()+1}-01`;
      }
      if (!endDate) {
        endDate = dayjs(startDate).add(1, 'month').format('YYYY-MM-DD');
      }
      const  [financesFiltered, total] =
        await this.financesRepository.find({
          where: [
          {
            financeDate: Between(new Date(startDate), new Date(endDate)),
            financeType: filter
          },
          {
            financeDate: Between(new Date(startDate), new Date(endDate)),
            financeCategory: filter
          },
          {
            financeDate: Between(new Date(startDate), new Date(endDate)),
            financeDescription: filter
          },
          {
            financeDate: Between(new Date(startDate), new Date(endDate)),
            status: filter
          },
        ],
          order: {
            created_at: 'DESC',
          },
          skip: pageIndex * pageSize || 0,
          take: pageSize || 100,
        });
      return { total, financesFiltered };
    } catch (e) {
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
      return this.financesRepository.save({
        ...foundFinance,
        ...updateFinanceDto,
      });
    } catch (e) {
      this.financesUtils.returnErrorContactCreate(e);
    }
  }

  async remove(id: string) {
    try {
      const financeFound = await this.financesRepository.findOneBy({ id });
      if (!financeFound) {
        throw new NotFoundException(FINANCES_ERRORS.financeNotExixts);
      }
      await this.financesRepository.softRemove(financeFound);
      return;
    } catch (e) {
      return this.financesUtils.returnErrorContactCreate(e);
    }
  }
}
