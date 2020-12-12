import { Router } from 'express';
import meetsRouter from '@modules/meets/infra/http/routes/meets.routes';
import participantsRouter from '@modules/meets/infra/http/routes/participants.routes';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Agile Poker - backend' });
});

routes.use('/meets', meetsRouter);
routes.use('/participants', participantsRouter);

export default routes;
