import { Router } from 'express';
import usersRouter from '@modules/exampleModule/infra/http/routes/users.routes';
import profileRouter from '@modules/exampleModule/infra/http/routes/profile.routes';
import passwordRouter from '@modules/exampleModule/infra/http/routes/password.routes';
import sessionsRouter from '@modules/exampleModule/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/profile', profileRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);

export default routes;
