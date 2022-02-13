import * as jf from 'joiful';

export class CreateUserRequestBody {
    @(jf.string().required())
    name: string;
}

export class CreateUserResponse {
    @(jf.number().required())
    id: number

    @(jf.string().required())
    name: string
}

export class GetUserResponse {
    @(jf.number().required())
    id: number

    @(jf.string().required())
    name: string
}

export class GetUsersListResponse {
    @jf.array({ elementClass: GetUserResponse })
    users: GetUserResponse[];
}