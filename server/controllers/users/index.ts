import { IUser } from "server/domain/entities/users";
import { IUsersRepository } from "server/domain/repositories/users";
export class UsersController {
    private readonly usersRepository: IUsersRepository;
    constructor(params) {
        this.usersRepository = params.usersRepository;
    }
    public async getAllUsers(): Promise<Array<IUser>> {
        return await this.usersRepository.list();
    }
}