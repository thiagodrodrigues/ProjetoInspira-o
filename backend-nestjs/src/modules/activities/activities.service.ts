import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Like, Repository } from 'typeorm';
import { ActivityEntity } from './entities/activity.entity';
import { ActivitiesUtils } from './activities.utils';
import { FiltersPaginationDto } from 'src/shared/dto/filters-pagination.dto';
import { BLOG_ERRORS } from 'src/shared/helpers/errors/blog-errors.helpers';

@Injectable()
export class ActivitiesService {
  constructor(
    @Inject('ACTIVITY_REPOSITORY')
    private activitiesRepository: Repository<ActivityEntity>,
    private activitiesUtils: ActivitiesUtils,
  ) {}


  async create(createActivityDto: CreateActivityDto) {
    try {
      createActivityDto.titleUrl = createActivityDto.title.replaceAll(" ", "-").toLowerCase().replaceAll(/[^\w\s]/gi, '')
      const activity_create = this.activitiesRepository.create(createActivityDto);
      const activity_saved = await this.activitiesRepository.save(activity_create);
      return activity_saved
    } catch (e) {
      this.activitiesUtils.returnErrorContactCreate(e);
    }
  }

  async findAll(filtersDTO: FiltersPaginationDto, status?: boolean): Promise<any> {
    try {
      const { pageSize, pageIndex } = filtersDTO;
      let { filter } = filtersDTO;

      if (!filter) {
        filter = '';
      }
      const  [activitiesFiltered, total] =
        await this.activitiesRepository.find({
          where: {
            title: Like(`%${filter}%`),
            status: status,
          },
          order: {
            created_at: 'DESC',
          },
          skip: pageIndex * pageSize || 0,
          take: pageSize || 100,
        });
      return { total, activitiesFiltered };
    } catch (e) {
      return this.activitiesUtils.returnErrorContactCreate(e);
    }
  }

  async findOne(titleUrl: string, status?: boolean) {
    try {
      const foundActivity: ActivityEntity | null = await this.activitiesRepository.findOne({
        where: {
          titleUrl: titleUrl,
          status: status
        },
      });
      if (!foundActivity) {
        throw new BadRequestException(BLOG_ERRORS.contentNotExixts);
      }
      return foundActivity
    } catch (e) {
      this.activitiesUtils.returnErrorContactCreate(e);
    }
  }

  async update(titleUrl: string, updateActivityDto: UpdateActivityDto) {
    try {
      const foundActivity: ActivityEntity | null = await this.activitiesRepository.findOne({
        where: {
          titleUrl: titleUrl,
        },
      });
      if (!foundActivity) {
        throw new BadRequestException(BLOG_ERRORS.contentNotExixts);
      }
      return this.activitiesRepository.save({
        ...foundActivity,
        ...updateActivityDto,
      });
    } catch (e) {
      this.activitiesUtils.returnErrorContactCreate(e);
    }
  }

  async remove(id: string) {
    try {
      const activityFound = await this.activitiesRepository.findOneBy({ id });
      if (!activityFound) {
        throw new NotFoundException(BLOG_ERRORS.contentNotExixts);
      }
      await this.activitiesRepository.softRemove(activityFound);
      return;
    } catch (e) {
      return this.activitiesUtils.returnErrorContactCreate(e);
    }
  }
}
