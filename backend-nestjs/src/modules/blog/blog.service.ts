import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Like, Repository } from 'typeorm';
import { BlogEntity } from './entities/blog.entity';
import { BlogUtils } from './blog.utils';
import { FiltersPaginationDto } from 'src/shared/dto/filters-pagination.dto';
import { BLOG_ERRORS } from 'src/shared/helpers/errors/blog-errors.helpers';

@Injectable()
export class BlogService {
  constructor(
    @Inject('BLOG_REPOSITORY')
    private blogRepository: Repository<BlogEntity>,
    private blogUtils: BlogUtils,
  ) {}

  async create(createBlogDto: CreateBlogDto) {
    try {
      createBlogDto.titleUrl = createBlogDto.title.replaceAll(" ", "-").toLowerCase().replaceAll(/[^\w\s-]/gi, '')
      const blog_create = this.blogRepository.create(createBlogDto);
      const blog_saved = await this.blogRepository.save(blog_create);
      return blog_saved
    } catch (e) {
      this.blogUtils.returnErrorContactCreate(e);
    }
  }

  async findAll(filtersDTO: FiltersPaginationDto, status?: boolean): Promise<any> {
    try {
      const { pageSize, pageIndex } = filtersDTO;
      let { filter } = filtersDTO;

      if (!filter) {
        filter = '';
      }
      const  [blogFiltered, total] =
        await this.blogRepository.find({
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
      return { total, blogFiltered };
    } catch (e) {
      return this.blogUtils.returnErrorContactCreate(e);
    }
  }

  async findOne(titleUrl: string, status?: boolean) {
    try {
      const foundBlog: BlogEntity | null = await this.blogRepository.findOne({
        where: {
          titleUrl: titleUrl,
          status: status
        },
      });
      if (!foundBlog) {
        throw new BadRequestException(BLOG_ERRORS.contentNotExixts);
      }
      return foundBlog
    } catch (e) {
      this.blogUtils.returnErrorContactCreate(e);
    }
  }

  async update(titleUrl: string, updateBlogDto: UpdateBlogDto) {
    try {
      const foundBlog: BlogEntity | null = await this.blogRepository.findOne({
        where: {
          titleUrl: titleUrl,
        },
      });
      if (!foundBlog) {
        throw new BadRequestException(BLOG_ERRORS.contentNotExixts);
      }
      return this.blogRepository.save({
        ...foundBlog,
        ...updateBlogDto,
      });
    } catch (e) {
      this.blogUtils.returnErrorContactCreate(e);
    }
  }

  async remove(id: string) {
    try {
      const blogFound = await this.blogRepository.findOneBy({ id });
      if (!blogFound) {
        throw new NotFoundException(BLOG_ERRORS.contentNotExixts);
      }
      await this.blogRepository.softRemove(blogFound);
      return;
    } catch (e) {
      return this.blogUtils.returnErrorContactCreate(e);
    }
  }
}
