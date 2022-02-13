import { IUser } from "server/domain/entities/users";
import { IUsersRepository } from "server/domain/repositories/users";

export class UsersRepository implements IUsersRepository {
    public async list(): Promise<Array<IUser>> {
        return [
            { id: 101, name: 'Alice' },
            { id: 102, name: 'Bob' },
            { id: 103, name: 'Caroline' },
            { id: 104, name: 'Dave' },
        ]
    }
}