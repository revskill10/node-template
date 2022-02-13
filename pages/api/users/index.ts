import {
  core,
  RequestAsyncHandler,
  NewResponseBuilder,
} from 'server/adapter/middlewares';
import { UsersRepository } from 'server/adapter/repositories/users';
import { GetUsersListResponse } from 'server/adapter/resources/http/users';
import { UsersController } from 'server/controllers/users';
const url = '/api/users';

const usersRepository = new UsersRepository();
const usersController = new UsersController({
  usersRepository,
});
const handler = core().get(
  url,
  RequestAsyncHandler(
    async () => {
      const result = await usersController.getAllUsers();
      return { users: result };
    }
  ),
  NewResponseBuilder(GetUsersListResponse)
);

export default handler;
