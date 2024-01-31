import Router from 'express';
import { usersRouter } from '~/modules/accounts/infra/http/routes/user.router';


const router = Router();

router.get('/', (_, res) => {
  return res.json('Welcome to the Mirantes accounts api.');
});

router.use('/users', usersRouter)


export default router;
