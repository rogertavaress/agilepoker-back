import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import MeetsController from '../controllers/MeetsController';

const meetsRouter = Router();
const meetsController = new MeetsController();

meetsRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  meetsController.store,
);

meetsRouter.post(
  '/joinmeet',
  celebrate({
    [Segments.BODY]: {
      idMeet: Joi.string().required(),
      name: Joi.string().required(),
    },
  }),
  meetsController.index,
);

export default meetsRouter;