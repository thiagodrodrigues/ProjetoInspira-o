import { UsersEntity } from "../entities/user/type.users.entity"

export interface IUsersRepository {
    create(resource: UsersEntity): Promise<UsersEntity>,
    deleteById(resourceId: number): Promise<void>,
    updateById(resource: UsersEntity): Promise<UsersEntity | undefined>,
    readByWhere(resourceId: string): Promise<UsersEntity | undefined>,
    readById(resourceId: number): Promise<UsersEntity | undefined>,
    listById(resourceId: number): Promise<UsersEntity[]>,
    list(): Promise<UsersEntity[]>,
}