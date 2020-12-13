import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import MeetsController from '../controllers/MeetsController';

const meetsRouter = Router();
const meetsController = new MeetsController();

meetsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  meetsController.store,
);

meetsRouter.patch(
  '/status',
  celebrate({
    [Segments.BODY]: {
      idMeet: Joi.string().required(),
      statusMeet: Joi.string().required(),
    },
  }),
  meetsController.updateStatus,
);

meetsRouter.patch(
  '/historyNow',
  celebrate({
    [Segments.BODY]: {
      idMeet: Joi.string().required(),
      idHistoryNow: Joi.number().required(),
    },
  }),
  meetsController.updateHistoryNow,
);

export default meetsRouter;
