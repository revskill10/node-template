import { IUser } from "server/domain/entities/users";

export interface IUsersRepository {
    list(): Promise<Array<IUser>>;
}