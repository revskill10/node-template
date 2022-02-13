import { GetUsersListResponse } from '../adapter/resources/http/users';

const url = '/api/users';

export const openApiConfig = {
  route: url,
  handlers: [
    {
      method: 'GET',
      tags: ['USERS'],
      description: 'Get all users',
      response: GetUsersListResponse,
    },
  ],
};