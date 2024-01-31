import { Router } from 'express';

import CreateUserFactory from '../factories/create-user-factory';
import ListUsersFactory from '../factories/list-users.factory';

const usersRouter = Router({ mergeParams: true });

usersRouter.post('/', (req, res) => CreateUserFactory.handle(req, res));

usersRouter.get('/', (req, res) => ListUsersFactory.handle(req, res));

export { usersRouter };
