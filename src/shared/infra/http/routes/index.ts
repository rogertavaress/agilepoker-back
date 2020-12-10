import { Router } from 'express';
import meetsRouter from '@modules/meets/infra/http/routes/meets.routes';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'OK' });
});

routes.use('/meets', meetsRouter);

export default routes;
