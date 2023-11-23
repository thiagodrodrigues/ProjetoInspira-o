import { BlogEntity } from "../entities/blog/type.blog.entity";

export interface IBlogRepository {
    create(resource: BlogEntity): Promise<BlogEntity>,
    deleteById(resourceId: number): Promise<void>,
    updateById(resource: BlogEntity): Promise<BlogEntity | undefined>,
    readById(resourceId: number): Promise<BlogEntity | undefined>,
    list(): Promise<BlogEntity[]>,
}